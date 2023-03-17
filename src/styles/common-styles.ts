export const COMMON_STYLES = {
  flex: (factor?: number) => ({
    flex: factor ?? 1,
  }),
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
} as const;
