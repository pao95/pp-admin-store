import { useState } from "react";
import { Box, Table, Text } from "@mantine/core";
import { translate } from "../../../../../../hooks/useTranslator";
import CustomTitle from "../../../../../../components/CustomTitle";
import { makeStyles } from "./styles";
import { MenuActions } from "./menuActions";
import EditUser from "./editUser";
import { IUser } from "../../../../core/entities/IUser";
import { IProvince } from "../../../../core/entities/IProvince";
import { ILocality } from "../../../../core/entities/ILocality";

interface UserTabProps {
  users: IUser[];
  onEditUser: (userId: number) => void;
  onUpdateUser: (userId: number, userData: IUser) => void;
  loading: boolean;
  provinces: IProvince[];
  localities: ILocality[];
  onProvinceChange: (provinceName: string) => void;
}

const UserTab = ({
  users,
  onEditUser,
  onUpdateUser,
  loading,
  provinces,
  localities,
  onProvinceChange,
}: UserTabProps) => {
  const t = translate();
  const styles = makeStyles();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);

  const handleEditUser = (userId: number) => {
    const user = users.find((u) => u.idUser === userId);
    if (user) {
      setSelectedUser(user);
      setIsEditingUser(true);
    }
    onEditUser(userId);
  };

  const handleBackToList = () => {
    setIsEditingUser(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (userId: number, userData: IUser) => {
    onUpdateUser(userId, userData);
    setIsEditingUser(false);
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.idUser}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {user.lastNameUser}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.firstNameUser}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.dniUser}</Text>
      </Table.Td>

      <Table.Td style={{ textAlign: "right" }}>
        <MenuActions onEditUser={() => handleEditUser(user.idUser as number)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {!isEditingUser ? (
        // Vista del listado de usuarios
        <Box style={styles.containerBox}>
          <Box mb="md">
            <CustomTitle type="title2">{t("store.edit.commons.tabs.users")}</CustomTitle>
          </Box>

          <Table withColumnBorders mt="xl" striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("store.edit.userSection.fields.lastNameUser")}</Table.Th>
                <Table.Th>{t("store.edit.userSection.fields.firstNameUser")}</Table.Th>
                <Table.Th>{t("store.edit.userSection.fields.dniUser")}</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text ta="center" c="dimmed" size="sm">
                      {loading ? "Cargando usuarios..." : "No hay usuarios registrados"}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Box>
      ) : (
        <>
          {selectedUser && (
            <EditUser
              user={selectedUser}
              onUpdateUser={handleUpdateUser}
              onBack={handleBackToList}
              loading={loading}
              provinces={provinces}
              localities={localities}
              onProvinceChange={onProvinceChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserTab;
