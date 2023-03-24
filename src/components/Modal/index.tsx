import { FC, PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface IModal {
  open: boolean;
  onClose: (show: boolean) => void;
  title?: string;
}

const ModalDialog: FC<PropsWithChildren<IModal>> = ({
  open = false,
  onClose,
  title = "",
  children,
}): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog"
      aria-describedby="alert-dialog"
    >
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
