export const authDisabled = true;

// Sidebar widths in pixels (better don't change these values)
export const SIDEBAR_WIDTH = 300;
export const SIDEBAR_WIDTH_COLLAPSED = 140;

export const getSidebarOpen = () => {
  const storedValue = localStorage.getItem("sidebarOpen");
  return storedValue ? JSON.parse(storedValue) : false;
};
export const setSidebarOpenStorage = (isOpen: boolean) => {
  localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
};
