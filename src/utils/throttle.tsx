export type ThrottleParams = {
  callCount: number;
};

export function throttle(params: ThrottleParams): boolean {
  const { callCount } = params;
  // console.debug("Initial call count:", callCount);
  if (!callCount) {
    return false;
  }

  if (callCount < 10) {
    // console.debug(`current Callcount ${callCount}`);
    // console.debug(`${action.name} is called`);
    return false;
  }

  if (callCount > 10) {
    return true;
  }

  return false;
}
