import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
const ListAlertSkeleton = () => {
  return Array.from({ length: 9 }, (_, index) => index).map((_) => {
    return (
      <>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <MarkChatReadIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Skeleton
              animation="wave"
              variant="circular"
              width={45}
              height={45}
            />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation="wave" height={25} width="70%" />}
            secondary={<Skeleton animation="wave" height={20} width="15%" />}
          />
        </ListItem>
        <Divider />
      </>
    );
  });
};

export default ListAlertSkeleton;
