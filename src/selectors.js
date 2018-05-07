export const randomIntFromInterval = function(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
};

export const sortArrayofObj = function (a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
};

