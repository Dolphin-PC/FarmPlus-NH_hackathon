import { useState, useEffect } from "react";
import { Badge, Col, Row } from "reactstrap";
import { Settings, ChevronRight } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SET_NAV } from "../actions/types";
import { Button } from "@material-ui/core";
import { registerFinAccount } from "../api/financialActions";
import TradeDialog from "../components/dialogs/TradeDialog";
import { RootStateType } from "../reducers";

const SettingPageView = () => {
  const [tradeType, setTradeType] = useState("");
  const [openTrade, setOpenTrade] = useState(false);

  const user = useSelector((state: RootStateType) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_NAV,
      payload: window.location.href.split("/")[3],
    });
  }, [dispatch]);

  const handleTrade = (e) => {
    setOpenTrade(true);
  };

  const handleAccount = () => {
    registerFinAccount(user);
  };
  const handleRemit = () => {};
  const handleContract = () => {};
  const handleQna = () => {};

  const GyuljaehamRender = () => {
    let waitTrade = [],
      proceedTrade = [],
      completeTrade = [];
    if (user.trade) {
      user.trade.map((trade) => {
        switch (trade.noticeType) {
          case "거래대기":
            return waitTrade.push(trade);
          case "거래진행":
            return proceedTrade.push(trade);
          case "거래완료":
            return completeTrade.push(trade);
          default:
            return null;
        }
      });
    }

    return (
      <div
        className="LeftBorder30"
        style={{
          backgroundColor: "#2D4441",
          width: "100%",
          padding: 20,
        }}
      >
        <h4 style={{ color: "white" }}>결재함</h4>
        <Row style={{ color: "white" }}>
          <Col
            xs="4"
            className="center"
            onClick={(e) => {
              setTradeType("거래대기");
              handleTrade(e);
            }}
          >
            <h5>{waitTrade.length}</h5>
            거래대기
          </Col>
          <Col
            xs="4"
            className="center"
            onClick={(e) => {
              setTradeType("거래진행");
              handleTrade(e);
            }}
          >
            <h5>{proceedTrade.length}</h5>
            거래진행
          </Col>
          <Col
            xs="4"
            className="center"
            onClick={(e) => {
              setTradeType("거래완료");
              handleTrade(e);
            }}
          >
            <h5>{completeTrade.length}</h5>
            거래완료
          </Col>
        </Row>
      </div>
    );
  };

  const MyMenuRender = () => {
    return (
      <div
        className="LeftBorder30"
        style={{
          marginTop: 30,
          backgroundColor: "#C7B492",
          padding: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>My Menu</h4>
          <div>
            <Settings /> 설정
          </div>
        </div>
        <Row>
          <Col xs="5" style={borderBottomStyle}>
            <Button onClick={handleAccount}>
              핀어카운트 발급
              <ChevronRight />
            </Button>
          </Col>
          <Col xs="5" style={borderBottomStyle}>
            <Button onClick={handleRemit}>
              송금
              <ChevronRight />
            </Button>
          </Col>
          <Col xs="5" style={borderBottomStyle}>
            <Button onClick={handleContract}>
              계약서 조회
              <ChevronRight />
            </Button>
          </Col>
          <Col xs="5" style={borderBottomStyle}>
            <Button onClick={handleQna}>
              고객센터
              <ChevronRight />
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  const MessageRender = () => {
    return (
      <div style={{ padding: 20 }}>
        <h4>
          메시지가
          <br />
          도착했습니다.
        </h4>

        <Badge color="info">이체</Badge>
        <p>(주)사계절무역상사로부터 30,000,000원이 입금되었습니다.</p>
      </div>
    );
  };

  return (
    <div className="MainStyle">
      <div style={{ paddingLeft: 30, paddingTop: 30 }}>
        <p>내 정보</p>

        <h3>
          <b>{user.name}</b> 님<br />
          안녕하세요.
        </h3>
        <GyuljaehamRender />
        <MyMenuRender />
        <MessageRender />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          height: 500,
          width: "100%",
          backgroundColor: "#E7E1D9",
          zIndex: -1,
        }}
      />
      <TradeDialog open={openTrade} onClose={() => setOpenTrade(!openTrade)} tradeType={tradeType} />
    </div>
  );
};

const borderBottomStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: 10,
  borderBottom: "1px solid grey",
};

export default SettingPageView;
