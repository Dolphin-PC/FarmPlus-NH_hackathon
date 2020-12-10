import React, { Fragment, useState } from "react";

//import DescriptionIcon from "@material-ui/icons/Description";
import DescriptionIcon from "@material-ui/icons/ViewColumn";
import ColumnDialog from "../dialogs/ColumnDialog";

const NoticeCardComp = (props) => {
  const [openColumnDialog, setOpenColumnDialog] = useState(false);

  const handleNoticeClick = () => {
    setOpenColumnDialog(true);
    window.open(
      "https://www.nongsaro.go.kr/portal/ps/psx/psxn/sptExpertDtl.ps;jsessionid=aktb3ax47n1l0abW506oh1JMU7a1d1jssU6f4CJIJEMZOT3cV2VAsCjsREPTFUkp.nongsaro-web_servlet_engine1?menuId=PS63117&infoNo=12&colmnNo=2&pageIndex=1&pageSize=10&sCtgCode=&sType=all&sWord=&sOrdrType=date",
      "_blank"
    );
  };

  const NoticeIconRender = () => {
    return (
      <div className="Col">
        <DescriptionIcon style={{ fontSize: 50 }} />
      </div>
    );
  };

  return (
    <div>
      <div className="Row" style={{ marginTop: 10 }}>
        <NoticeIconRender />
        &emsp;
        <div onClick={handleNoticeClick}>
          <h5> 오늘의 칼럼 (12.13)</h5>
          <small> [ 농업인 유튜브 어떻게 활용할 것인가? ]</small>
        </div>
        {/* <ColumnDialog
          open={openColumnDialog}
          onClose={() => setOpenColumnDialog(!openColumnDialog)}
          {...props}
        /> */}
      </div>
      <small> &nbsp;&nbsp; 칼럼 </small>
    </div>
  );
};

export default NoticeCardComp;