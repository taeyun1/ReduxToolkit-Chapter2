import { parseISO, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    });
    timeAgo = `${timePeriod} `; // 접미사 추가 (분,시간)전
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
export default TimeAgo;
