const convertMillesecondsToTime = (ms) => {
  const curTime = new Date().getTime();
  const millis = curTime - ms; // Get the difference in milliseconds.

  // First, attempt to convert to minutes.
  const min = millis / 60000;
  if (min < 60) return `${Math.round(min)} min`;

  // Convert that to hours.
  const hours = min / 60;
  if (Math.round(hours) === 1) return '1 hr';
  else if (hours < 24) return `${Math.round(hours)} hrs`;

  // Finally, display it in days.
  const days = hours / 24;
  if (Math.round(days) === 1) return '1 day';
  return `${Math.round(days)} days`;
};

export default convertMillesecondsToTime;
