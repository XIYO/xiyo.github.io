// 깃 로그 기반으로 마크다운 프론트매터를 배열로 변환하는 스크립트 (ESM)
// 사용법: node gitlog-to-frontmatter.js <markdown-glob-pattern>

import fs from 'fs';
import { execSync } from 'child_process';
import matter from 'gray-matter';
import fg from 'fast-glob';

function getGitLog(filePath) {
  // --follow: 파일명 변경 추적, --date=iso-strict: ISO8601, --reverse: 오래된 순
  const log = execSync(
    `git log --follow --pretty=format:"%ad|%an|%s" --date=iso-strict --reverse -- "${filePath}"`,
    { encoding: 'utf8' }
  );
  return log.split('\n').filter(Boolean).map(line => {
    const [date, author, message] = line.split('|');
    return { date, author, message };
  });
}

function extractTitleFromMarkdown(content) {
  // 첫 번째 # 헤딩(레벨1) 추출 (공백 포함 전체)
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function slugify(str) {
  // 한글, 영문, 숫자, 공백, 하이픈, 언더스코어 모두 허용
  return str
    .toLowerCase()
    .replace(/[^가-힣\w\s-]/g, '') // 한글, 영문, 숫자, 언더스코어, 공백, 하이픈만 남김
    .replace(/\s+/g, '-')           // 공백을 하이픈으로
    .replace(/-+/g, '-')             // 연속 하이픈 하나로
    .replace(/(^-+)|(-+$)/g, '');    // 양끝 하이픈 제거
}

function renameWithDateTitleSlug(mdPath, dateStr, title, origBase) {
  // dateStr: '2024-03-12T20:50:16+09:00' → '24-03-12'
  const d = new Date(dateStr);
  const yy = String(d.getUTCFullYear()).slice(2);
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const datePart = `${yy}-${mm}-${dd}`;
  const ext = mdPath.slice(mdPath.lastIndexOf('.'));
  const dir = mdPath.slice(0, mdPath.lastIndexOf('/'));
  const slug = slugify(title);
  // 파일명: 날짜---슬러그---원래이름.md
  const newName = `${dir}/${datePart}---${slug}---${origBase}${ext}`;
  // 이미 동일 규칙이면 중복 방지
  if (mdPath === newName) return mdPath;
  try {
    execSync(`git mv "${mdPath}" "${newName}"`);
    console.log(`Git moved: ${mdPath} → ${newName}`);
  } catch {
    fs.renameSync(mdPath, newName);
    console.log(`Renamed (fallback): ${mdPath} → ${newName}`);
  }
  return newName;
}

function updateFrontmatter(mdPath) {
  const raw = fs.readFileSync(mdPath, 'utf8');
  const parsed = matter(raw);
  const records = getGitLog(mdPath);
  if (!records.length) return;

  // 배열로만 구성
  const authors = Array.from(new Set(records.map(r => r.author)));
  const dates = records.map(r => r.date);
  const messages = records.map(r => r.message);

  // 기존 프론트매터와 병합(덮어쓰기)
  const newData = {
    ...parsed.data,
    authors,
    dates,
    messages
  };

  // 프론트매터 갱신
  const newContent = matter.stringify(parsed.content, newData);
  fs.writeFileSync(mdPath, newContent, 'utf8');
  console.log(`Updated: ${mdPath}`);

  // 파일명에 날짜---슬러그---원래이름 규칙 적용
  const title = extractTitleFromMarkdown(parsed.content);
  const origBase = mdPath.slice(mdPath.lastIndexOf('/') + 1, mdPath.lastIndexOf('.'));
  renameWithDateTitleSlug(mdPath, dates[0], title, origBase);
}

// 사용 예: node gitlog-to-frontmatter.js "posts/**/*.md"
const pattern = process.argv[2] || 'posts/**/*.md';
for (const file of fg.sync(pattern)) {
  updateFrontmatter(file);
}
