type MenuSlice = { activeMenu: boolean; menus: Menu[] }

type Menu = { name: string; path?: string; items?: Menu[]; _id?: any }
