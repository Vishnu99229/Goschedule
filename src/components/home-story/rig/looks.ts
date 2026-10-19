export type CharacterLook = {
  hair: 'short' | 'bun' | 'none'
  glasses?: boolean
  saree?: boolean
  /** 1 = You. Mom is slightly shorter. */
  scale?: number
}

export const YOU_LOOK: CharacterLook = { hair: 'short' }
export const MOM_LOOK: CharacterLook = { hair: 'bun', glasses: true, saree: true, scale: 0.9 }
