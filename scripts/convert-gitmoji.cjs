#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// 깃모지 매핑 테이블 (코드 -> 실제 이모지)
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

function getCommitList() {
  try {
    const output = execSync('git log --oneline --all', { encoding: 'utf8' });
    return output.trim().split('\n').map(line => {
      const [hash, ...messageParts] = line.split(' ');
      return {
        hash,
        message: messageParts.join(' ')
      };
    });
  } catch (error) {
    console.error('Git log를 가져오는 중 오류 발생:', error);
    return [];
  }
}

function convertGitmojiToEmoji(message) {
  let convertedMessage = message;
  
  // 깃모지 코드를 실제 이모지로 변환
  for (const [code, emoji] of Object.entries(gitmojis)) {
    convertedMessage = convertedMessage.replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
  }
  
  return convertedMessage;
}

function createRewriteScript() {
  const commits = getCommitList();
  const scriptLines = ['#!/bin/bash', ''];
  
  console.log(`총 ${commits.length}개의 커밋을 처리합니다.`);
  
  commits.forEach((commit) => {
    const originalMessage = commit.message;
    const convertedMessage = convertGitmojiToEmoji(originalMessage);
    
    if (originalMessage !== convertedMessage) {
      console.log(`변환: ${originalMessage} -> ${convertedMessage}`);
      
      // git filter-branch 명령어 생성 (매우 조심스럽게!)
      const filterCommand = `git filter-branch -f --msg-filter 'if [ "$GIT_COMMIT" = "${commit.hash}" ]; then echo "${convertedMessage.replace(/"/g, '\\"')}"; else cat; fi' HEAD`;
      scriptLines.push(`# ${commit.hash}: ${originalMessage}`);
      scriptLines.push(filterCommand);
      scriptLines.push('');
    }
  });
  
  // 스크립트 파일 생성
  const scriptContent = scriptLines.join('\n');
  fs.writeFileSync('rewrite-commits.sh', scriptContent, { mode: 0o755 });
  
  console.log('\n⚠️  경고: 이 작업은 Git 히스토리를 완전히 다시 작성합니다!');
  console.log('⚠️  원격 저장소에 푸시된 커밋이 있다면 매우 위험할 수 있습니다!');
  console.log('⚠️  작업 전에 반드시 백업을 생성하세요!');
  console.log('\n생성된 스크립트: rewrite-commits.sh');
  console.log('실행하려면: chmod +x rewrite-commits.sh && ./rewrite-commits.sh');
  
  return scriptContent;
}

// 메인 실행
if (require.main === module) {
  createRewriteScript();
}

module.exports = { convertGitmojiToEmoji, gitmojis };
