const formatDate = (datestring) => {
  // console.log(datestring);
  if (datestring) {
    const createDate = new Date(datestring);
    if (!isNaN(createDate)) {
      const date = `${("0" + createDate.getDate()).slice(-2)}`;
      const month = `${("0" + (createDate.getMonth() + 1)).slice(-2)}`;
      const year = `${createDate.getFullYear()}`;
      const formattedDate = `${date}/${month}/${year}`;
      return formattedDate;
    }
  } else {
    return datestring;
  }
};

const formatDateTime = (dateString) => {
  if (dateString) {
    const createDate = new Date(dateString);
    if (!isNaN(createDate)) {
      const date = `${("0" + createDate.getDate()).slice(-2)}`;
      const month = `${("0" + (createDate.getMonth() + 1)).slice(-2)}`;
      const year = `${createDate.getFullYear()}`;
      const hour = `${("0" + createDate.getHours()).slice(-2)}`;
      const minute = `${("0" + createDate.getMinutes()).slice(-2)}`;

      const formattedDate = `${date}/${month}/${year}, ${hour}:${minute}`;
      return formattedDate;
    }
  }
  return null;
};
const formatTime = (dateString) => {
  if (dateString) {
    const createDate = new Date(dateString);
    if (!isNaN(createDate)) {
      const hour = `${("0" + createDate.getHours()).slice(-2)}`;
      const minute = `${("0" + createDate.getMinutes()).slice(-2)}`;

      const formattedDate = `${hour}:${minute}`;
      return formattedDate;
    }
  }
  return null;
};

const timeMinusSeven = (time) => {
  const date = new Date(time);
  date.setHours(date.getHours() - 7);
  // console.log(date);
  return date.toISOString();
};

const formatThaiDateTime = (dateString) => {
  const createDate = new Date(dateString);
  if (!isNaN(createDate)) {
    return createDate.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long", //or numeric
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  } else {
    return dateString;
  }
};

export { formatDate, formatDateTime, formatTime, timeMinusSeven, formatThaiDateTime };
