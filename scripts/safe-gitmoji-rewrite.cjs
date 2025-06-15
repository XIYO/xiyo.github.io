#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// 깃모지 매핑 테이블
const gitmojis = {
  ':art:': '🎨',
  ':zap:': '⚡️',
  ':fire:': '🔥',
  ':bug:': '🐛',
  ':ambulance:': '🚑️',
  ':sparkles:': '✨',
  ':memo:': '📝',
  ':rocket:': '🚀',
  ':lipstick:': '💄',
  ':tada:': '🎉',
  ':white_check_mark:': '✅',
  ':lock:': '🔒️',
  ':closed_lock_with_key:': '🔐',
  ':bookmark:': '🔖',
  ':rotating_light:': '🚨',
  ':construction:': '🚧',
  ':green_heart:': '💚',
  ':arrow_down:': '⬇️',
  ':arrow_up:': '⬆️',
  ':pushpin:': '📌',
  ':construction_worker:': '👷',
  ':chart_with_upwards_trend:': '📈',
  ':recycle:': '♻️',
  ':heavy_plus_sign:': '➕',
  ':heavy_minus_sign:': '➖',
  ':wrench:': '🔧',
  ':hammer:': '🔨',
  ':globe_with_meridians:': '🌐',
  ':pencil2:': '✏️',
  ':poop:': '💩',
  ':rewind:': '⏪️',
  ':twisted_rightwards_arrows:': '🔀',
  ':package:': '📦️',
  ':alien:': '👽️',
  ':truck:': '🚚',
  ':page_facing_up:': '📄',
  ':boom:': '💥',
  ':bento:': '🍱',
  ':wheelchair:': '♿️',
  ':bulb:': '💡',
  ':beers:': '🍻',
  ':speech_balloon:': '💬',
  ':card_file_box:': '🗃️',
  ':loud_sound:': '🔊',
  ':mute:': '🔇',
  ':busts_in_silhouette:': '👥',
  ':children_crossing:': '🚸',
  ':building_construction:': '🏗️',
  ':iphone:': '📱',
  ':clown_face:': '🤡',
  ':egg:': '🥚',
  ':see_no_evil:': '🙈',
  ':camera_flash:': '📸',
  ':alembic:': '⚗️',
  ':mag:': '🔍️',
  ':label:': '🏷️',
  ':seedling:': '🌱',
  ':triangular_flag_on_post:': '🚩',
  ':goal_net:': '🥅',
  ':dizzy:': '💫',
  ':wastebasket:': '🗑️',
  ':passport_control:': '🛂',
  ':adhesive_bandage:': '🩹',
  ':monocle_face:': '🧐',
  ':coffin:': '⚰️',
  ':test_tube:': '🧪',
  ':necktie:': '👔',
  ':stethoscope:': '🩺',
  ':bricks:': '🧱',
  ':technologist:': '🧑‍💻',
  ':money_with_wings:': '💸',
  ':thread:': '🧵',
  ':safety_vest:': '🦺',
  ':airplane:': '✈️'
};

function convertGitmojiToEmoji(message) {
  let convertedMessage = message;
  
  for (const [code, emoji] of Object.entries(gitmojis)) {
    convertedMessage = convertedMessage.replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
  }
  
  return convertedMessage;
}

function getCommitsToConvert() {
  try {
    const output = execSync('git log --oneline --all', { encoding: 'utf8' });
    const commits = output.trim().split('\n').map(line => {
      const [hash, ...messageParts] = line.split(' ');
      return {
        hash,
        message: messageParts.join(' ')
      };
    });
    
    // 변환이 필요한 커밋만 필터링
    return commits.filter(commit => {
      const converted = convertGitmojiToEmoji(commit.message);
      return converted !== commit.message;
    });
  } catch (error) {
    console.error('Git log를 가져오는 중 오류 발생:', error);
    return [];
  }
}

async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function performSafeRewrite() {
  console.log('🔍 깃모지 코드가 포함된 커밋을 찾는 중...\n');
  
  const commitsToConvert = getCommitsToConvert();
  
  if (commitsToConvert.length === 0) {
    console.log('✅ 변환이 필요한 커밋이 없습니다. 모든 커밋이 이미 이모지 형태입니다!');
    return;
  }
  
  console.log(`📝 변환이 필요한 커밋 ${commitsToConvert.length}개를 발견했습니다:\n`);
  
  commitsToConvert.slice(0, 10).forEach(commit => {
    const converted = convertGitmojiToEmoji(commit.message);
    console.log(`${commit.hash}: ${commit.message}`);
    console.log(`       -> ${converted}\n`);
  });
  
  if (commitsToConvert.length > 10) {
    console.log(`... 그리고 ${commitsToConvert.length - 10}개 더\n`);
  }
  
  console.log('⚠️  주의사항:');
  console.log('   • 이 작업은 Git 히스토리를 다시 작성합니다');
  console.log('   • 원격 저장소와 동기화된 상태에서는 위험할 수 있습니다');
  console.log('   • 작업 전에 백업을 권장합니다\n');
  
  const answer = await askQuestion('계속 진행하시겠습니까? (y/N): ');
  
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('작업이 취소되었습니다.');
    return;
  }
  
  // 백업 브랜치 생성
  const backupBranch = `backup-before-gitmoji-${Date.now()}`;
  try {
    execSync(`git branch ${backupBranch}`, { stdio: 'inherit' });
    console.log(`\n✅ 백업 브랜치 생성됨: ${backupBranch}`);
  } catch (error) {
    console.error('백업 브랜치 생성 실패:', error.message);
    return;
  }
  
  // git filter-branch를 사용한 안전한 메시지 변환
  console.log('\n🔄 커밋 메시지를 변환하는 중...');
  
  try {
    // 모든 깃모지 변환을 한 번에 처리하는 필터 스크립트 생성
    const filterScript = `#!/bin/bash
message=$(cat)
${Object.entries(gitmojis).map(([code, emoji]) => 
  `message=$(echo "$message" | sed 's/${code.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&')}/${emoji}/g')`
).join('\n')}
echo "$message"`;
    
    fs.writeFileSync('/tmp/gitmoji-filter.sh', filterScript, { mode: 0o755 });
    
    // git filter-branch 실행
    execSync('git filter-branch -f --msg-filter "/tmp/gitmoji-filter.sh" -- --all', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('\n✅ 커밋 메시지 변환이 완료되었습니다!');
    console.log(`📋 백업 브랜치: ${backupBranch}`);
    console.log('\n변환된 결과를 확인하려면: git log --oneline');
    console.log('백업으로 되돌리려면: git reset --hard ' + backupBranch);
    
    // 임시 파일 정리
    fs.unlinkSync('/tmp/gitmoji-filter.sh');
    
  } catch (error) {
    console.error('\n❌ 변환 중 오류 발생:', error.message);
    console.log(`백업으로 되돌리려면: git reset --hard ${backupBranch}`);
  }
}

// 메인 실행
if (require.main === module) {
  performSafeRewrite().catch(console.error);
}

module.exports = { convertGitmojiToEmoji, gitmojis };
