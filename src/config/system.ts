export const authDisabled = true;

export const SIDEBAR_WIDTH = 300;
export const SIDEBAR_WIDTH_COLLAPSED = 164;

export const getSidebarOpen = () => {
  const storedValue = localStorage.getItem("sidebarOpen");
  return storedValue ? JSON.parse(storedValue) : false;
};
export const setSidebarOpenStorage = (isOpen: boolean) => {
  localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
};
