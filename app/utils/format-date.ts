export const extractYear = (date: string | undefined): string => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return parsedDate.getFullYear().toString();
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa do 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
