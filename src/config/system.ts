export const authDisabled = true;

// Sidebar widths in pixels (better don't change these values)
export const SIDEBAR_WIDTH = 324;
export const SIDEBAR_WIDTH_COLLAPSED = 164;

export const getSidebarOpen = () => {
  const storedValue = localStorage.getItem("sidebarOpen");
  return storedValue ? JSON.parse(storedValue) : false;
};
export const setSidebarOpenStorage = (isOpen: boolean) => {
  localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
};
