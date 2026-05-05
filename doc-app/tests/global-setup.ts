export default function setup() {
  return () => {
    // @ts-expect-error - This is a hack to allow the process to exit after tests are done, since Vitest doesn't handle this well in some environments (e.g. CI)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    setTimeout(() => process.exit(0), 1000).unref();
  };
}
