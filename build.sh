#!/bin/bash
# Source cargo environment first
source "$HOME/.cargo/env" 2>/dev/null

# Set PATH with Solana tools and cargo
export PATH="$HOME/.cargo/bin:/home/arya/.local/share/solana/install/active_release/bin:/usr/local/bin:/usr/bin:/bin"

# Force use of system cargo
export CARGO="$HOME/.cargo/bin/cargo"
export RUSTC="$HOME/.cargo/bin/rustc"

cd /mnt/c/Users/1arya/OneDrive/Desktop/polyield/polyield

echo "Using Rust: $(rustc --version)"
echo "Using Cargo: $(cargo --version)"
echo "Building..."

anchor build
