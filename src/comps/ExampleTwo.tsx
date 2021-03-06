import {
  FormGroup,
  FormLabel,
  TextField,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import DataConverter from "./DataConverter";

// https://github.com/TheBox193/epoch-cli/blob/master/index.js
// https://github.com/Izzur/epoch/blob/master/src/App.js

// npm install moment --save   # npm
// yarn add moment             # Yarn
// Install-Package Moment.js   # NuGet
// spm install moment --save   # spm
// meteor add momentjs:moment  # meteor
// bower install moment --save # bower (deprecated)

const Conjo = [
  [1000, "sasdasd", "10-2-2020", 1581292800],
  [1001, "erer", "10-2-2020", 1581292800],
  [1002, "lorem ipsum dolor simet ", "11-2-2020", 1581379200],
  [1004, "Lorem ipsum", "24-4-2020", 1587686400],
  [1006, "sdsdsdsdsdsdsdsdsd", "11-5-2020", 1589155200],
  [1007, "sasasasasa", "24-4-2020", 1587686400],
  [1008, "sasasasasa", "24-4-2020", 1587686400],
  [1009, "sasasasasa", "24-4-2020", 1587686400],
  [1011, "asdasdasd", "13-5-2020", 1589328000],
  [1012, "asasdads", "18-5-2020", 1589760000],
  [1013, "wwdssdsd", "12-5-2020", 1589241600],
  [1014, "sdsdsd sdsdsd", "24-4-2020", 1587686400],
  [1015, "1591697281514", "9-6-2020", 1591660800],
  [1016, "e2e report title", "9-6-2020", 1591660800],
  [1041, "1591869570879", "11-6-2020", 1591833600]
];

// interface Form

// converts epoch to dd-mm-yyyy
function formatDate(epoch: number) {
  const date = new Date(epoch);
  var d = date.getUTCDate().toString(),
    m = (date.getUTCMonth() + 1).toString(),
    y = date.getUTCFullYear().toString(),
    formatted = "";
  if (d.length === 1) {
    d = "0" + d;
  }
  if (m.length === 1) {
    m = "0" + m;
  }
  formatted = d + "-" + m + "-" + y;
  return formatted;
}

let x = 1383483902000;
let f = formatDate(x);
console.log("test", f);

var myDate = new Date(1581292800 * 1000);
console.log(myDate.toGMTString() + "<br>" + myDate.toLocaleString());

export const ExampleTwo = () => {
  const [dateFilterChecked, setDateFilterChecked] = useState(true);

  const columns = [
    {
      name: "ID",
      options: {
        filter: false
      }
    },
    {
      label: "Modified Title Label",
      name: "Title",
      options: {
        filter: false
      }
    },

    {
      name: "Date",
      options: {
        filter: false
      }
    },

    {
      name: "Epoch",
      options: {
        filter: true,
        filterType: "custom",
        filterList: [],
        // hier moeten de filter chips datums laten zien
        customFilterListOptions: {
          render: v => {
            if (v[0] && v[1] && dateFilterChecked) {
              return [`Start Date: ${v[0]}`, `End Date: ${v[1]}`];
            } else if (v[0] && v[1] && !dateFilterChecked) {
              return `Start Date: ${v[0]}, End Date: ${v[1]}`;
            } else if (v[0]) {
              return `Start Date: ${v[0]}`;
            } else if (v[1]) {
              return `End Date: ${v[1]}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            console.log(
              "customFilterListOnDelete: ",
              filterList,
              filterPos,
              index
            );

            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          }
        },
        filterOptions: {
          names: [],
          logic(date, filters) {
            if (filters[0] && filters[1]) {
              return date < filters[0] || date > filters[1];
            } else if (filters[0]) {
              return date < filters[0];
            } else if (filters[1]) {
              return date > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Date</FormLabel>
              <FormGroup row>
                <TextField
                  label="start"
                  value={filterList[index][0] || ""}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="end"
                  value={filterList[index][1] || ""}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dateFilterChecked}
                      onChange={event =>
                        setDateFilterChecked(event.target.checked)
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                />
              </FormGroup>
            </div>
          )
        },

        print: false
      }
    }
  ];

  const options = {
    filter: true,
    filterType: "multiselect",
    responsive: "standard"
  };

  type Props = {};

  const datePicker: React.FunctionComponent<Props> = props => {
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<DateRange>({});

    return (
      <DateRangePicker open={open} onChange={range => setDateRange(range)} />
    );
  };

  return (
    <MUIDataTable
      title={"ACME Employee list - customizeFilter"}
      data={Conjo}
      columns={columns}
      options={options}
    />
  );
};

// export default ExampleTwo;
