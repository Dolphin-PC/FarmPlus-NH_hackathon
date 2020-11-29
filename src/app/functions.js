export const getToday = () => {
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();

   return `${year}-${month}-${day}`;
};

export const getTodayApi = () => {
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();

   return `${year}${month}${day}`;
};
export const getTimeApi = () => {
   var date = new Date();
   var hour = date.getHours();
   var minutes = date.getMinutes();
   var seconds = date.getSeconds();
   if (hour < 10) {
      hour = "0" + hour;
   }
   if (minutes < 10) {
      minutes = "0" + minutes;
   }
   if (seconds < 10) {
      seconds = "0" + seconds;
   }

   return `${hour}${minutes}${seconds}`;
};

export const getIsTuno = () => {
   return Math.floor(Math.random() * 100000000000000 + 1);
};
