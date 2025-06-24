const DateHelpers = {
  timestamptzToNatural(dateString: string) {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formatter.format(date);
  },
};

export default DateHelpers;
