import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

/*
 *
 *
 *
 *   이 컴포넌트는 사용되지 않았어요
 *
 *
 *
 */

const RequesterInfoDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const DialogRender = (props) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          [김훈동 칼럼] <br />
          농업인 생존도 어렵다
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    );
  };
  return (
    <DialogRender>
      한 해의 맨 마지막 계절은 겨울이다. 겨울 철새들로 가금농가들은 고병원성 조류인플루엔자(AI)발생으로 고역을 치른다. 코로나19 확산세도 가라앉지 않고 있다. 식생활 양상도 바꿔놓았다. 건강에 대한
      관심이 높아져 면역력 향상과 관련된 건강기능성 식품 구매도 크게 늘었다. 외국산보다 안전한 국산 농식품 섭취가 건강에 이롭다는 인식과 함께 어려움에 처한 농가를 살리자는 착한 소비운동도 한몫했다.
      하지만 농업인은 여전히 어렵다. 추수가 끝났지만 손에 잡히는 소득은 없기에 그렇다. <br />
      <br />
      여름철 호우·태풍 등 극심한 기상악화로 작황이 나빠 쌀 생산량이 1968년 이후 최저치로 떨어졌다. 물가는 해마다 3~5%씩 오른다. 정곡(精穀)은 그대로다. 현재 산지 쌀값이 80kg 한가마당 21만5820원이다.
      지난해 수확기보다 14%정도 상승했다. 이를 두고 쌀값이 폭등했다고 호들갑을 떤다. 물가상승의 주범으로 몰린다. 국민 1인당 쌀 소비량은 연 59.2kg이다. 한 달 소비는 대략 5kg이다. 하루 450원 정도에
      불과하다. 커피 한잔 값의 10분의 1 수준이다. 쌀값이 다른 물가에 비해 비싼 것도 아니다. <br />
      <br /> 정부가 일제강점기부터 쌀을 80kg들이 가마니로 수매하던 관행을 이어오기 때문에 오해를 받는 것이다. 요즘 소비자들은 5kg, 10kg들이를 구입하는 게 현실이다. 이젠 쌀값 발표도 소포장 단위로
      변경해야 한다. 대부분 농가가 벼농사를 짓는데다 논이 창출하는 공익적 가치가 막대한 만큼 쌀이 소외돼선 안 된다. <br />
      <br />
      유엔식량농업기구(FAO)는 ‘신종 코로나바이러스 감염증(코로나19) 대유행은 앞으로 몇 년 동안 식량안보를 더욱 악화시킬 것’이라는 전망을 발표했다. 기상청은 ‘21세기말 한국은 연평균 기온이 최대 4.7도
      상승하면 집중호우로 홍수 위험과 가뭄 피해가 동시에 증가할 것’이라고 한국 기후변화 평가보고서에서 분석했다. 기후변화와 더욱 불안해진 식량안보 등 전례 없는 위기 속에서 한국 농업의 돌파구를 찾아야
      할 때다. 곡물자급률이 32.7%에서 21.9%로 떨어졌다. 코로나 위기를 기회로 바꾸는 농업만이 생존한다. “세상은 넓고 할 일은 많다.”고 했다. 식량공급기지인 농업·농촌·농업인이도 할 일이 많다. <br />
      <br /> 요즘 우리 정치권은 쓸 때 없는 곳에 장기간 국력을 낭비하여 국민들 피로감만 쌓이게 하고 있다. 터널이 있으면 반드시 끝이 있기 마련이다. 누구도 먹지 않고는 살아갈 수 없다. 외국산 먹거리가
      식탁의 3분의 2를 야금야금 잠식했다. 한국의 ‘kimchi’가 영문명으로 고유명사화 됐는데도 중국은 한국의 중국산 김치 수입 현황을 들먹이며 김치종주국이라고 주장한다. 배추, 파, 마늘, 고추가루 등
      양념류를 중국산으로 만드니 자기들이 종주국이라는 궤변이다. 무분별한 농축산물 수입으로 농업인은 이래저래 힘들다. 축산농가는 야생멧돼지들로 돼지열병(ASF)과 구제역을 방역을 하느라 한시도 허리피고
      쉴 틈이 없었다. 할 일 많은 농업계를 지원하는 것도 정부와 국민의 몫이다.
      <br />
      <br />
      [출처] 경기신문 (https://www.kgnews.co.kr)
    </DialogRender>
  );
};

export default RequesterInfoDialog;
