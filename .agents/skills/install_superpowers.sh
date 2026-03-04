#!/bin/bash

# ==============================================================================
# Superpowers Skills Installer
# 
# This script downloads the Antigravity "Superpowers" skills from a designated 
# GitHub repository and installs them into the `.agents/skills` directory of 
# your current working project.
#
# Usage: 
#   curl -sSL https://raw.githubusercontent.com/<YOUR_USER>/<REPO>/main/install_superpowers.sh | bash
#   OR
#   ./install_superpowers.sh
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status

# --- Configuration ---
# TODO: Update this to point to the actual GitHub repository where you host the skills
REPO_URL="https://github.com/Drscq/superpowers-skills.git" 
TARGET_DIR=".agents/skills"
TMP_DIR=$(mktemp -d -t superpowers-XXXXXX)

# --- Cleanup Trap ---
cleanup() {
    echo "🧹 Cleaning up temporary files..."
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

# --- Main Logic ---
echo "🚀 Starting Superpowers Skills Installation..."

# 1. Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: 'git' is not installed or not in PATH."
    exit 1
fi

# 2. Create target directory if it doesn't exist
if [ ! -d "$TARGET_DIR" ]; then
    echo "📁 Creating target directory: ./$TARGET_DIR"
    mkdir -p "$TARGET_DIR"
fi

# 3. Clone the repository into the temporary directory
echo "📥 Cloning skills from $REPO_URL..."
git clone --quiet --depth 1 "$REPO_URL" "$TMP_DIR"

# 4. Find all folders starting with "superpowers-" in the cloned repo
echo "📦 Installing skills into ./$TARGET_DIR..."
FOUND_SKILLS=false

for skill_path in "$TMP_DIR"/superpowers-*; do
    if [ -d "$skill_path" ]; then
        skill_name=$(basename "$skill_path")
        
        # Check if skill already exists in target directory
        if [ -d "${TARGET_DIR}/${skill_name}" ]; then
            echo "   ⚠️  Updating existing skill: $skill_name"
            rm -rf "${TARGET_DIR}/${skill_name}"
        else
            echo "   ✅ Installing new skill: $skill_name"
        fi
        
        # Copy the skill folder to the target directory
        cp -R "$skill_path" "$TARGET_DIR/"
        FOUND_SKILLS=true
    fi
done

# 5. Final validation
if [ "$FOUND_SKILLS" = true ]; then
    echo "🎉 Success! The Superpowers skills have been installed to ./$TARGET_DIR"
else
    echo "❌ Error: No 'superpowers-*' folders were found in the repository."
    echo "   Ensure the repository '$REPO_URL' contains the skill folders at its root."
    exit 1
fi
