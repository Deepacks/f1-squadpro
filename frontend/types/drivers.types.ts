export interface Driver {
  _id: string
  firstName: string
  lastName: string
  isF1Driver?: boolean
  defaultTeam?: string
  isMainDriver?: boolean
}

export interface DriverLocal {
  id: string
  firstName: string
  lastName: string
  team: string
}
