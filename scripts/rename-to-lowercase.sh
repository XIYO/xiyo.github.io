#!/bin/bash

# Script to rename directories to lowercase using git mv

# Array of directories to rename
declare -A directories=(
    ["static/posts/en-US"]="static/posts/en-us"
    ["static/posts/ja-JP"]="static/posts/ja-jp"
)

# Function to rename directory
rename_directory() {
    local old_path="$1"
    local new_path="$2"
    
    if [ -d "$old_path" ]; then
        echo "Renaming $old_path to $new_path..."
        git mv "$old_path" "$new_path"
        if [ $? -eq 0 ]; then
            echo "✓ Successfully renamed $old_path to $new_path"
        else
            echo "✗ Failed to rename $old_path"
        fi
    else
        echo "⚠ Directory $old_path not found"
    fi
}

# Main execution
echo "Starting directory rename to lowercase..."
echo "========================================="

for old_path in "${!directories[@]}"; do
    new_path="${directories[$old_path]}"
    rename_directory "$old_path" "$new_path"
done

echo "========================================="
echo "Directory rename complete!"
echo ""
echo "Don't forget to update any references to these paths in your code!"