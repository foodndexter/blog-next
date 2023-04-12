type Theme = { isLightMode: boolean; color: string; point: string; backgroundColor: string } & ThemeHandler

type ThemeMode = "light" | "dark"

type ThemeHandler = { themeHandler: (target: ThemeTarget, value?: any) => void }

type ThemeTarget = "theme" | "color" | "point" | "backgroundColor"

type User = { isLoggedIn: boolean; user: any }
