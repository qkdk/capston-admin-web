import * as React from "react";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSelectionModel,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, modalState } from "../../../atoms";
import { useQuery } from "react-query";
import { fetchAllStore, fetchAllUser } from "../../../api";
import {
  IPageDetail,
  IShopDetail,
  IUserDetail,
  UserRole,
} from "../../../interfaces";
import { IconButton, Modal } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShopCompNew from "./modalComp/ShopCompNew";
import ShopCompDel from "./modalComp/ShopCompDel";

function ShopComp() {
  const jwt = useRecoilValue(authAtom);
  const [modState, setModState] = useRecoilState(modalState);
  const [page, setPage] = useState(1);
  const [modalComp, setModalComp] = useState(<Box />);
  const [selectedName, setSelectedName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleOpen = (flag: boolean) => {
    // switch (flag) {
    //   case 1:
    //     setModState(true);
    //     break;
    //   default:
    //     alert("한명의 유저를 선택해 주세요");
    //     break;
    // }
    flag ? setModState(true) : alert("한개의 가맹점을 선택하여 주세요");
  };

  const handleClose = () => setModState(false);
  const { isLoading, data } = useQuery<IShopDetail>(
    ["allShop", page],
    async () => await fetchAllStore(jwt.accessToken, page)
  );

  const columns: GridColDef[] = [
    { field: "phoneNumber", headerName: "PhoneNumber", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "address", headerName: "Address", width: 200 },
    // { field: "storeImageFileName", headerName: "ImageName", width: 200 },
  ];

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <Box style={{ height: "100%", width: "100%", minHeight: "70vh" }}>
      <DataGrid
        getRowId={(row) => row.phoneNumber}
        rows={data!.storeResponseList}
        columns={columns}
        hideFooter={true}
        onCellClick={(params: GridCellParams) => {
          console.log(params.row);
          setSelectedName(params.row.name);
          setSelectedNumber(params.row.phoneNumber);
        }}
      />

      <Box display="flex">
        <Button
          onClick={() => {
            setModalComp(<ShopCompNew />);
            handleOpen(true);
          }}
        >
          <Typography>가맹점 추가</Typography>
        </Button>
        <Button
          onClick={() => {
            setModalComp(
              <ShopCompDel name={selectedName} phoneNumber={selectedNumber} />
            );
            handleOpen(selectedName !== "");
          }}
        >
          <Typography>가맹점 삭제</Typography>
        </Button>
        <IconButton
          aria-label="backward"
          disabled={page < 2}
          sx={{ ml: "auto" }}
          onClick={() => setPage(page - 1)}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          aria-label="forward"
          disabled={page == data!.totalPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Modal
          open={modState}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {modalComp}
        </Modal>
      </Box>
    </Box>
  );
}

export default ShopComp;
