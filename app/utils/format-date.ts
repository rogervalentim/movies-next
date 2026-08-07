export const extractYear = (date: string | undefined): string => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.getFullYear().toString();
};

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Data não informada";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ? new Date(`${dateString}T12:00:00`)
    : new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Data não informada";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa do 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
