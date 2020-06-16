import * as React from "react";
import "./styles.css";
import { ExampleTwo } from "./comps/ExampleTwo";
import {
  DateRangePicker,
  DateRange
} from "@matharumanpreet00/react-daterange-picker";

import "styled-components/macro";

type Props = {};
const DatePicker: React.FunctionComponent<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  return (
    <DateRangePicker open={open} onChange={range => setDateRange(range)} />
  );
};

export default function App() {
  return (
    <div className="App">
      <h2>Karim's strugglebox</h2>
      <div
        css={`
          outline: 1px solid red;
        `}
      >
        <DatePicker />
      </div>
      {/* <ExampleTwo /> */}
    </div>
  );
}
