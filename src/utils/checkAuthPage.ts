const checkAuthPage = (pathname: string): boolean => {
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  if (isAuthPage) {
    return true;
  } else {
    return false;
  }
};

export default checkAuthPage;
