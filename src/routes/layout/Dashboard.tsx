import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CoinChart from "./dashboard/CoinChart";
import HomeComp from "./dashboard/HomeComp";
import { useState } from "react";
import UserComp from "./user/UserComp";
import TransactionComp from "./transaction/TransactionComp";
import CoinComp from "./coin/CoinComp";
import ShopComp from "./shop/ShopComp";

const drawerWidth = 240;

// interface IDashboard {}

function Dashboard() {
  const [mainComponent, setMainComponent] = useState(<HomeComp />);
  const sidebar = [
    <HomeComp />,
    <UserComp />,
    <CoinComp />,
    <ShopComp />,
    <TransactionComp />,
  ];

  const handleSideClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setMainComponent(sidebar[index]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/*해더 파트*/}
      <AppBar
        position="fixed"
        style={{
          background: "#90CAF9",
        }}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          borderRadius: 5,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hanbat Currency Manager
          </Typography>
        </Toolbar>
      </AppBar>
      {/*서랍 파트*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["홈", "사용자 관리", "코인 관리", "가맹점 관리", "트랜잭션"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={(event) => {
                    handleSideClick(event, index);
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      {/*본문 파트*/}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {mainComponent}
      </Box>
    </Box>
  );
}

export default Dashboard;