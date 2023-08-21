import React from 'react';
import { InfoCard, Page, Header, Content } from '@backstage/core-components';
import { Box, Typography, Grid } from '@material-ui/core';

const GitHubStatus = () => {
  const [statusData, setStatusData] = React.useState(null);
  React.useEffect(() => {
    fetch("https://kctbh9vrtdwd.statuspage.io/api/v2/status.json").then((response) => response.json()).then((data) => {
      const { status, page } = data;
      console.log(data);
      setStatusData({
        status: status.indicator,
        last_updated: page.updated_at,
        message: status.description
      });
    }).catch((error) => {
      console.error("Error fetching GitHub status:", error);
    });
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(InfoCard, { title: "GitHub Status" }, statusData ? /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Typography, null, "Status: ", statusData.status), /* @__PURE__ */ React.createElement(Typography, null, "Last Updated: ", statusData.last_updated)) : /* @__PURE__ */ React.createElement(Typography, null, "Loading GitHub status...")));
};

const StatusPage = () => {
  return /* @__PURE__ */ React.createElement(Page, { themeId: "home" }, /* @__PURE__ */ React.createElement(Header, { title: "Status Page" }), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(Grid, { container: true, direction: "row" }, /* @__PURE__ */ React.createElement(Grid, { item: true, xs: 12 }, /* @__PURE__ */ React.createElement(GitHubStatus, null)), /* @__PURE__ */ React.createElement(Grid, { item: true, xs: 3 }))));
};

export { StatusPage };
//# sourceMappingURL=index-79c64529.esm.js.map
