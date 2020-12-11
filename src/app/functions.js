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
   if (year < 10) {
      year = "0" + year;
   }
   if (month < 10) {
      month = "0" + month;
   }
   if (day < 10) {
      day = "0" + day;
   }

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

export const TabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <div>{children}</div>}
      </div>
   );
};
export const a11yProps = (index) => {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
};
