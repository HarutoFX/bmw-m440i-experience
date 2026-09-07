import { create } from 'zustand'

export type ColorOption = 'alpine_white' | 'black_sapphire' | 'brooklyn_grey' | 'isle_of_man_green' | 'toronto_red' | 'marina_bay_blue' | 'voodoo_blue' | 'thundernight'
export type InteriorOption = 'black' | 'cognac' | 'red'
export type ConfigStep = 'exterior' | 'interior' | 'none'
export type EnvironmentOption = 'studio' | 'city' | 'sunset'

interface ConfiguratorState {
  selectedColor: ColorOption
  selectedInterior: InteriorOption
  activeConfigStep: ConfigStep
  activeHotspot: string | null
  selectedEnvironment: EnvironmentOption
  lastInteractionTime: number
  setColor: (color: ColorOption) => void
  setInterior: (interior: InteriorOption) => void
  setActiveConfigStep: (step: ConfigStep) => void
  setActiveHotspot: (hotspot: string | null) => void
  setEnvironment: (env: EnvironmentOption) => void
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedColor: 'brooklyn_grey',
  selectedInterior: 'black',
  activeConfigStep: 'none',
  activeHotspot: null,
  selectedEnvironment: 'studio',
  lastInteractionTime: 0,
  setColor: (color) => set({ selectedColor: color, lastInteractionTime: Date.now() }),
  setInterior: (interior) => set({ selectedInterior: interior, lastInteractionTime: Date.now() }),
  setActiveConfigStep: (step) => set({ activeConfigStep: step }),
  setActiveHotspot: (hotspot) => set({ activeHotspot: hotspot }),
  setEnvironment: (env) => set({ selectedEnvironment: env }),
}))
