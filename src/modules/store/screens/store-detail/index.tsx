import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Container, Group } from "@mantine/core";
import { translate } from "../../../../hooks/useTranslator";
import CustomTitle from "../../../../components/CustomTitle";
import { IStoreDetailPresenter } from "../../core/presentation/IStoreDetailPresenter";
import { StoreDetailScreens } from "../../core/screens/IStoreDetailScreens";

import { IProvince } from "../../core/entities/IProvince";
import { ILocality } from "../../core/entities/ILocality";
import { IIndustry } from "../../core/entities/IIndustry";
import { storeDetailPresenterProvider } from "../../infrastructure/presentation/detail/presenterProvider";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";
import { downloadBlob } from "../../../../utils/downloadUtils";
import { makeStyles } from "./styles";
import GeneralTab from "./components/generalTab";
import UserTab from "./components/userTab";
import DocumentsTab from "./components/documentsTab";
import { HeaderEditStore } from "./components/headerEditStore";
import CustomButtonWithIcon from "../../../../components/CustomButtonWithIcon";
import { IconArrowLeft } from "@tabler/icons-react";
import { IStore } from "../../core/entities/IStore";
import { IUser } from "../../core/entities/IUser";
import {
  IDocument,
  IDocumentUpload,
  DocumentType,
  DocumentStatus,
  documentTypeMapping,
} from "../../core/entities/IDocument";
import { STORE_DETAIL } from "../../../../routes/constants";

const StoreDetail = () => {
  const t = translate();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const location = useLocation();

  const currentTab = location.pathname.split("/").pop();

  const [presenter, setPresenter] = useState<IStoreDetailPresenter>({} as IStoreDetailPresenter);

  const [storeGeneral, setStoreGeneral] = useState<IStore | null>(null);
  const [storeUsers, setStoreUsers] = useState<IUser[]>([]);
  const [storeDocuments, setStoreDocuments] = useState<IDocument[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [localities, setLocalities] = useState<ILocality[]>([]);
  const [industries, setIndustries] = useState<IIndustry[]>([]);
  const [reloadDocuments, setReloadDocuments] = useState<boolean>(false);

  const styles = makeStyles();
  const presenterProvider = storeDetailPresenterProvider();

  const viewHandlers: StoreDetailScreens = {
    onGetStoreSuccess: (storeData: IStore) => {
      setStoreGeneral(storeData);
      setLoading(false);
    },
    onGetStoreError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.getStoreGeneral"), error);
      setLoading(false);
    },
    onGetUsersSuccess: (users: IUser[]) => {
      setStoreUsers(users);
      setLoading(false);
    },
    onGetUsersError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.getStoreUsers"), error);
      setLoading(false);
    },
    onGetUserSuccess: () => {
      setLoading(false);
    },
    onGetUserError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.getStoreUser"), error);
      setLoading(false);
    },
    onUpdateStoreSuccess: () => {
      showSuccessToast(t("store.edit.commons.success.updateStoreGeneral"));
      setLoading(false);
    },
    onUpdateStoreError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.updateStoreGeneral"), error);
      setLoading(false);
    },
    onUpdateUserSuccess: () => {
      showSuccessToast(t("store.edit.commons.success.updateStoreUser"));
      setLoading(false);
    },
    onUpdateUserError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.updateStoreUser"), error);
      setLoading(false);
    },
    onGetProvincesSuccess: (fetchedProvinces: IProvince[]) => {
      setProvinces(fetchedProvinces);
    },
    onGetProvincesError: (error) => {
      showErrorToast(t("store.edit.commons.errors.getProvinces"), error);
    },
    onGetLocalitiesSuccess: (fetchedLocalities: ILocality[]) => {
      setLocalities(fetchedLocalities);
    },
    onGetLocalitiesError: (error) => {
      showErrorToast(t("store.edit.commons.errors.getLocalities"), error);
    },
    onGetIndustriesSuccess: (fetchedIndustries: IIndustry[]) => {
      setIndustries(fetchedIndustries);
    },
    onGetIndustriesError: (error) => {
      showErrorToast(t("store.edit.commons.errors.getIndustries"), error);
    },
    onGetDocumentsSuccess: (documents: IDocument[]) => {
      setStoreDocuments(documents);
      setLoading(false);
    },
    onGetDocumentsError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.getStoreDocuments"), error);
      setLoading(false);
    },
    onDownloadDocumentSuccess: (blob: Blob, fileName: string) => {
      const result = downloadBlob({ blob, filename: fileName });

      if (result.success) {
        showSuccessToast(t("store.edit.commons.success.downloadDocument"));
      } else {
        showErrorToast(t("store.edit.commons.errors.downloadDocument"), result.error);
      }
    },
    onDownloadDocumentError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.downloadDocument"), error);
    },
    uploadDocumentsSuccess: () => {
      showSuccessToast(t("store.edit.commons.success.uploadDocument"));
      setLoading(false);
      setReloadDocuments(true);
    },
    uploadDocumentsError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.uploadDocument"), error);
      setLoading(false);
    },
    updateDocumentSuccess: () => {
      showSuccessToast(t("store.edit.commons.success.updateDocument"));
      setLoading(false);
      setReloadDocuments(true);
    },
    updateDocumentError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.updateDocument"), error);
      setLoading(false);
    },
    updateDocumentStatusSuccess: () => {
      showSuccessToast(t("store.edit.commons.success.updateDocumentStatus"));
      setLoading(false);
      setReloadDocuments(true);
    },
    updateDocumentStatusError: (error: string) => {
      showErrorToast(t("store.edit.commons.errors.updateDocumentStatus"), error);
      setLoading(false);
    },
  };

  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && presenter) {
      presenter.getProvinces();
      presenter?.getIndustries();

      if (storeId) {
        setLoading(true);
        presenter.getStore(parseInt(storeId));
        presenter.getUsersByStore(parseInt(storeId));
        presenter.getDocumentsByEntityId(parseInt(storeId));
      }
    }
  }, [loaded, presenter, storeId]);

  useEffect(() => {
    if (reloadDocuments && storeId) {
      presenter.getDocumentsByEntityId(parseInt(storeId));
    }
  }, [reloadDocuments]);

  const industriesOptions = industries.map((industry) => ({
    option: industry.name,
    key: industry.id,
  }));

  const handleUpdateStoreGeneral = (storeData: any) => {
    if (storeGeneral && storeId) {
      setLoading(true);
      presenter.updateStore(parseInt(storeId), storeData);
    }
  };

  const handleEditUser = (userId: number) => {
    if (storeId) {
      setLoading(true);
      presenter.getUser(userId);
    }
  };

  const handleUpdateUser = (userId: number, userData: any) => {
    if (storeId) {
      setLoading(true);
      presenter.updateUser(userId, userData);
    }
  };

  const handleProvinceChange = (provinceName: string) => {
    if (provinceName) {
      presenter.getLocalities(provinceName);
    } else {
      setLocalities([]);
    }
  };

  const handleBackToStores = () => {
    navigate("/stores");
  };

  const handleDownloadDocument = (document: IDocument) => {
    presenter.downloadDocument(document.id, document.fileName);
  };

  const handleChangeDocumentStatus = (documentId: number, newStatus: string) => {
    setLoading(true);
    presenter.updateDocumentStatus(documentId, newStatus as DocumentStatus);
  };

  const handleUpdateDocument = (file: File, documentId: number) => {
    setLoading(true);
    presenter.updateDocument(documentId, file);
  };

  const handleUploadDocument = (file: File, documentType: DocumentType, entityId: number) => {
    const propertyKey = documentTypeMapping[documentType];
    const documents: IDocumentUpload = {
      afipRegistrationDocument: null,
      iibbRegistrationDocument: null,
      dniFrontDocument: null,
      dniBackDocument: null,
      powerOfAttorneyDocument: null,
      storeRegistrationFormDocument: null,
      brandLogoDocument: null,
      [propertyKey]: file,
    };

    setLoading(true);
    presenter.uploadDocuments(documents, entityId);
  };

  // Crear objeto para el header
  const storeForHeader = storeGeneral
    ? {
        businessName: storeGeneral.businessNameStore,
        cuit: storeGeneral.cuitStore,
        vatCondition: storeGeneral.vatConditionStore,
        iibbRegistered: storeGeneral.iibbRegisteredStore,
        profitsRegistered: storeGeneral.profitsRegisteredStore,
        enabled: true, // Por defecto activo, ajustar según la lógica de negocio
      }
    : null;

  if (!storeGeneral || !storeForHeader) {
    return null;
  }

  const renderCurrentTab = () => {
    switch (currentTab) {
      case STORE_DETAIL.GENERAL:
        return (
          <GeneralTab
            store={storeGeneral}
            onUpdateStore={handleUpdateStoreGeneral}
            loading={loading}
            provinces={provinces}
            localities={localities}
            onProvinceChange={handleProvinceChange}
            industries={industriesOptions}
          />
        );
      case STORE_DETAIL.USERS:
        return (
          <UserTab
            users={storeUsers}
            onEditUser={handleEditUser}
            onUpdateUser={handleUpdateUser}
            loading={loading}
            provinces={provinces}
            localities={localities}
            onProvinceChange={handleProvinceChange}
          />
        );
      case STORE_DETAIL.BRANCHES:
        return (
          <Box p="md">
            <CustomTitle type="title2">{t("store.edit.commons.tabs.branches")}</CustomTitle>
            <p>{t("store.edit.commons.comingSoon")}</p>
          </Box>
        );
      case STORE_DETAIL.DOCUMENTS:
        return (
          <DocumentsTab
            documents={storeDocuments}
            loading={loading}
            storeId={storeId ? parseInt(storeId) : undefined}
            onDownloadDocument={handleDownloadDocument}
            onChangeDocumentStatus={handleChangeDocumentStatus}
            onUpdateDocument={handleUpdateDocument}
            onUploadDocument={handleUploadDocument}
          />
        );
      case STORE_DETAIL.LIQUIDITY:
        return (
          <Box p="md">
            <CustomTitle type="title2">{t("store.edit.commons.tabs.liquidity")}</CustomTitle>
            <p>{t("store.edit.commons.comingSoon")}</p>
          </Box>
        );

      default:
        return (
          <GeneralTab
            store={storeGeneral}
            onUpdateStore={handleUpdateStoreGeneral}
            loading={loading}
            provinces={provinces}
            localities={localities}
            onProvinceChange={handleProvinceChange}
            industries={industriesOptions}
          />
        );
    }
  };

  return (
    <Container size="xl">
      <Box mt="xl">
        <Group justify="flex-start">
          <Group>
            <CustomButtonWithIcon
              title={t("store.edit.commons.buttons.backToStores")}
              onClick={handleBackToStores}
              variant="subtle"
              disabled={false}
              icon={() => <IconArrowLeft />}
              leftIcon={true}
            />
          </Group>
        </Group>
      </Box>
      <Box mt={20} style={styles.containerContent} mb="xl">
        {/* Header */}
        <HeaderEditStore store={storeForHeader} />

        {/* Content */}
        <Box mt="xs">{renderCurrentTab()}</Box>
      </Box>
    </Container>
  );
};

export default StoreDetail;
