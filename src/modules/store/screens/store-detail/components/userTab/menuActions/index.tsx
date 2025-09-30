import { Button, Menu } from "@mantine/core";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { translate } from "../../../../../../../hooks/useTranslator";
import { useContext } from "react";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { PERMISSIONS } from "../../../../../../../constants/permissions";

interface MenuActionsProps {
  onEditUser: () => void;
}

export const MenuActions = ({ onEditUser }: MenuActionsProps) => {
  const t = translate();
  const { actions } = useContext(AuthContext);

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button variant="transparent" size="sm" color="gray">
          <IconDotsVertical size={16} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconEdit size={14} />}
          onClick={onEditUser}
          disabled={!actions.hasPermission([PERMISSIONS.USERS_EDIT])}
        >
          {t("store.edit.userSection.table.editUser")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
