import { PublicKey } from "@solana/web3.js"

// Devnet USDC Mint Address
export const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

// USDC has 6 decimals
export const USDC_DECIMALS = 6

// Program ID - Deployed to devnet
export const PROGRAM_ID = new PublicKey("FWGiD7WhXu8k7eDtEwr3ZbXbvqwL7kdJgNfugrSVJ7F3")

// Seed constants matching the Anchor program
export const VAULT_SEED = "vault"
export const VAULT_STATE_SEED = "vault_state"
export const USER_DEPOSIT_SEED = "user_deposit"

// Position enum values matching the Anchor program
export enum Position {
  Yes = 0,
  No = 1,
}
