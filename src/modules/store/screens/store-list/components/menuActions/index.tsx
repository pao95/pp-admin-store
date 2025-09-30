import { Button, Menu } from "@mantine/core";
import { IconBuildingStore, IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { translate } from "../../../../../../hooks/useTranslator";

interface MenuActionsProps {
  onEditStore: () => void;
  onEditBranches: () => void;
}

export const MenuActions = ({ onEditStore, onEditBranches }: MenuActionsProps) => {
  const t = translate();
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button variant="transparent" size="sm" color="gray">
          <IconDotsVertical size={16} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconEdit size={14} />} onClick={onEditStore}>
          {t("store.list.table.viewStore")}
        </Menu.Item>
        <Menu.Item leftSection={<IconBuildingStore size={14} />} onClick={onEditBranches}>
          {t("store.list.table.editBranches")}
        </Menu.Item>

        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
};
