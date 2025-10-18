#!/bin/bash

# Frontmatter 필드명 변경 스크립트
# published -> createdAt
# lastModified -> modifiedAt
# created -> createdAt
# modified -> modifiedAt

set -e

STATIC_DIR="/Users/gimtaehui/IdeaProjects/xiyo.github.io/static"

echo "Starting frontmatter field migration..."
echo "Target directory: $STATIC_DIR"
echo ""

# 변경할 파일 수 카운트
total_files=$(find "$STATIC_DIR" -name "*.md" -type f | wc -l | tr -d ' ')
echo "Total markdown files: $total_files"

published_count=$(grep -l "^published:" "$STATIC_DIR"/**/*.md 2>/dev/null | wc -l | tr -d ' ')
lastModified_count=$(grep -l "^lastModified:" "$STATIC_DIR"/**/*.md 2>/dev/null | wc -l | tr -d ' ')
created_count=$(grep -l "^created:" "$STATIC_DIR"/**/*.md 2>/dev/null | wc -l | tr -d ' ')
modified_count=$(grep -l "^modified:" "$STATIC_DIR"/**/*.md 2>/dev/null | wc -l | tr -d ' ')

echo "Files with 'published': $published_count"
echo "Files with 'lastModified': $lastModified_count"
echo "Files with 'created': $created_count"
echo "Files with 'modified': $modified_count"
echo ""

read -p "Proceed with migration? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled."
    exit 0
fi

# 변경 카운터
changed=0

# 모든 .md 파일 처리
find "$STATIC_DIR" -name "*.md" -type f | while read -r file; do
    # 임시 파일 생성
    tmp_file="${file}.tmp"

    # 변경 여부 플래그
    file_changed=false

    # sed로 필드명 변경
    sed -e 's/^published:/createdAt:/' \
        -e 's/^lastModified:/modifiedAt:/' \
        -e "s/^created: '/createdAt: '/" \
        -e "s/^created: \"/createdAt: \"/" \
        -e "s/^modified: '/modifiedAt: '/" \
        -e "s/^modified: \"/modifiedAt: \"/" \
        "$file" > "$tmp_file"

    # 변경 사항이 있는지 확인
    if ! cmp -s "$file" "$tmp_file"; then
        mv "$tmp_file" "$file"
        echo "Updated: $file"
        ((changed++)) || true
        file_changed=true
    else
        rm "$tmp_file"
    fi
done

echo ""
echo "Migration completed!"
echo "Files changed: $changed"
