export type CharacterLook = {
  hair: 'short' | 'bun' | 'none'
  glasses?: boolean
  saree?: boolean
}

export const YOU_LOOK: CharacterLook = { hair: 'short' }
export const MOM_LOOK: CharacterLook = { hair: 'bun', glasses: true, saree: true }
