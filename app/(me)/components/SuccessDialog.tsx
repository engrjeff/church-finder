import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

interface Props extends React.ComponentProps<typeof AlertDialog> {
  title: string;
  message: string;
  cancelText?: string;
  okText?: string;
  action: () => void;
  cancelAction?: () => void;
}

export default function SuccessDialog({
  title,
  message,
  cancelText = "Cancel",
  okText = "OK",
  action,
  cancelAction,
  ...dialogProps
}: Props) {
  return (
    <AlertDialog {...dialogProps}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className={buttonVariants({ variant: "secondary" })}
            onClick={cancelAction}
          >
            {cancelText}
          </AlertDialogAction>
          <AlertDialogAction onClick={action}>{okText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
