import React, { useState, useEffect } from "react";
import { Box, Group } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { IStoreRegisterPresenter } from "../../core/presentation/IStoreRegisterPresenter";
import { StoreRegisterScreens } from "../../core/screens/IStoreRegisterScreens";
import { IProvince } from "../../core/entities/IProvince";
import { ILocality } from "../../core/entities/ILocality";
import { IVatCondition } from "../../core/entities/IVatCondition";
import { IIibbRegistration } from "../../core/entities/IIibbRegistration";
import { IIndustry } from "../../core/entities/IIndustry";
import { translate } from "../../../../hooks/useTranslator";
import { storeRegisterPresenterProvider } from "../../infrastructure/presentation/register/presenterProvider";
import { STORES } from "../../../../routes/constants";
import { removeCuitDashes, extractDniFromCuit } from "../../../../utils/cuilFormatter";
import { showErrorToast, showSuccessToast } from "../../../../utils/toasts";
import { Wizard } from "../../../../components/Wizard";
import FormStep3 from "./components/FormStep3";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import { removePhoneCharacters } from "../../../../utils/phoneFormatter";
import CustomButtonWithIcon from "../../../../components/CustomButtonWithIcon";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { scrollElementToTop } from "../../../../utils/scrollToTop";
import CloseModal from "./components/closeModal";
import { IStore } from "../../core/entities/IStore";
import { IUser } from "../../core/entities/IUser";
import { IDocumentUpload } from "../../core/entities/IDocument";

// Opciones para los selects
const yesNoOptions = [
  { option: "Sí", key: "yes" },
  { option: "No", key: "no" },
];

const genderOptions = [
  { option: "Masculino", key: "male" },
  { option: "Femenino", key: "female" },
];

const StoreRegisterScreen: React.FC = () => {
  const t = translate();
  const navigate = useNavigate();
  const presenterProvider = storeRegisterPresenterProvider();

  const [presenter, setPresenter] = useState<IStoreRegisterPresenter>({} as IStoreRegisterPresenter);
  const [isLoadingCreateStore, setIsLoadingCreateStore] = useState<boolean>(false);
  const [isLoadingUploadDocuments, setIsLoadingUploadDocuments] = useState<boolean>(false);
  const [isLoadingCreateUserAndAssignToStore, setIsLoadingCreateUserAndAssignToStore] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [localities, setLocalities] = useState<ILocality[]>([]);
  const [vatConditions, setVatConditions] = useState<IVatCondition[]>([]);
  const [iibbRegistrations, setIibbRegistrations] = useState<IIibbRegistration[]>([]);
  const [industries, setIndustries] = useState<IIndustry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [storeId, setStoreId] = useState<number>(null as unknown as number);

  // Formulario centralizado con todas las validaciones
  const form = useForm<IStore & IUser & IDocumentUpload>({
    mode: "controlled",
    initialValues: {
      // Step 1 - Datos del titular (Holder)
      lastNameUser: "",
      firstNameUser: "",
      dniUser: "",
      cuilUser: "",
      birthDateUser: null as Date | null,
      genderUser: "",
      emailUser: "",
      phoneNumberUser: "",
      addressUser: "",
      addressNumberUser: "",
      localityUser: "",
      provinceUser: "",
      zipCodeUser: "",

      // Step 2 - Datos del comercio (Store)
      businessNameStore: "",
      tradeNameStore: "",
      streetStore: "",
      streetNumberStore: null,
      floorStore: "",
      apartmentStore: "",
      zipCodeStore: "",
      localityStore: "",
      provinceStore: "",
      vatConditionStore: "",
      cuitStore: "",
      iibbRegisteredStore: "",
      profitsRegisteredStore: "",
      categoryStore: [],
      emailStore: "",
      enabledStore: true,

      // Step 3 - Documentación (Documents)
      afipRegistrationDocument: null,
      iibbRegistrationDocument: null,
      storeRegistrationFormDocument: null,
      powerOfAttorneyDocument: null,
      dniFrontDocument: null,
      dniBackDocument: null,
      brandLogoDocument: null,
    },

    validateInputOnBlur: true,
    validate: {
      // Validaciones Step 1 - Holder
      lastNameUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 50) return t("common.validationsForm.maxLength", { max: 50 });
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return t("common.validationsForm.onlyLetters");
        return null;
      },
      firstNameUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 50) return t("common.validationsForm.maxLength", { max: 50 });
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return t("common.validationsForm.onlyLetters");
        return null;
      },
      cuilUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.toString().replace(/\D/g, "");
        if (digitsOnly.length !== 11) return t("common.validationsForm.invalidCuit");
        return null;
      },
      birthDateUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 100) return t("common.validationsForm.invalidAge");
        return null;
      },
      genderUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },

      phoneNumberUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.toString().replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 10) return t("common.validationsForm.invalidPhone");
        return null;
      },
      emailUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("common.validationsForm.invalidEmail");
        return null;
      },
      addressUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      addressNumberUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^\d+$/.test(value)) return t("common.validationsForm.invalidAddressNumber");
        return null;
      },
      localityUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      provinceUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      zipCodeUser: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^\d{4,5}$/.test(value)) return t("common.validationsForm.invalidZipCode");
        return null;
      },

      // Validaciones Step 2 - Store
      businessNameStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      tradeNameStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      streetStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      streetNumberStore: (value) => {
        if (value === null || value === undefined || !value) return t("common.validationsForm.required");
        if (value <= 0) return t("common.validationsForm.invalidStreetNumber");
        return null;
      },
      zipCodeStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length !== 4) return t("common.validationsForm.invalidZipCode");
        return null;
      },
      localityStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (value.length > 100) return t("common.validationsForm.maxLength", { max: 100 });
        return null;
      },
      provinceStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      vatConditionStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      cuitStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length !== 11) return t("common.validationsForm.invalidCuit");
        return null;
      },
      iibbRegisteredStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      profitsRegisteredStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        return null;
      },
      categoryStore: (value) => {
        if (!value || value.length === 0) return t("common.validationsForm.required");
        return null;
      },

      emailStore: (value) => {
        if (!value) return t("common.validationsForm.required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("common.validationsForm.invalidEmail");
        return null;
      },
    },
  });

  const viewHandlers: StoreRegisterScreens = {
    createStoreSuccess(idStore: number) {
      showSuccessToast(t("store.register.errors.create_store_success"));
      setIsLoadingCreateStore(false);
      setStoreId(idStore);
    },
    createStoreError(error) {
      showErrorToast(t("store.register.errors.create_store_error"), error);
      setIsLoadingCreateStore(false);
    },
    uploadDocumentsSuccess() {
      showSuccessToast(t("store.register.errors.upload_documents_success"));
      setIsLoadingUploadDocuments(false);
    },
    uploadDocumentsError(error) {
      showErrorToast(t("store.register.errors.upload_documents_error"), error);
      setIsLoadingUploadDocuments(false);
    },
    createUserAndAssignToStoreSuccess() {
      showSuccessToast(t("store.register.errors.create_user_and_assign_to_store_success"));
      setIsLoadingCreateUserAndAssignToStore(false);
      navigate(STORES);
    },
    createUserAndAssignToStoreError(error) {
      showErrorToast(t("store.register.errors.create_user_and_assign_to_store_error"), error);
      setIsLoadingCreateUserAndAssignToStore(false);
      navigate(STORES);
    },
    onGetProvincesSuccess: (fetchedProvinces: IProvince[]) => {
      setProvinces(fetchedProvinces);
    },
    onGetProvincesError: (error) => {
      showErrorToast(t("store.register.errors.get_provinces"), error);
    },
    onGetLocalitiesSuccess: (fetchedLocalities: ILocality[]) => {
      setLocalities(fetchedLocalities);
    },
    onGetLocalitiesError: (error) => {
      showErrorToast(t("store.register.errors.get_localities"), error);
    },
    onGetIndustriesSuccess: (fetchedIndustries: IIndustry[]) => {
      setIndustries(fetchedIndustries);
    },
    onGetIndustriesError: (error: string) => {
      showErrorToast(t("store.register.errors.get_industries"), error);
    },
    onGetVatConditionsSuccess: (fetchedVatConditions: IVatCondition[]) => {
      setVatConditions(fetchedVatConditions);
    },
    onGetVatConditionsError: (error: string) => {
      showErrorToast(t("store.register.errors.get_vat_conditions"), error);
    },
    onGetIibbRegistrationsSuccess: (fetchedIibbRegistrations: IIibbRegistration[]) => {
      setIibbRegistrations(fetchedIibbRegistrations);
    },
    onGetIibbRegistrationsError: (error: string) => {
      showErrorToast(t("store.register.errors.get_iibb_registrations"), error);
    },
  };
  useEffect(() => {
    // Solo se ejecuta si se ha creado la tienda y no se está cargando la creación
    if (storeId && !isLoadingCreateStore) {
      if (hasDocuments()) {
        handleUploadDocuments(form.values, storeId);
      }
      handleCreateUserAndAssignToStore(storeId, form.values);
    }
  }, [storeId, isLoadingCreateStore]);

  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && presenter) {
      presenter?.getProvinces();
      presenter?.getVatConditions();
      presenter?.getIibbRegistrations();
      presenter?.getIndustries();
    }
  }, [loaded, presenter]);

  // Convertir datos maestros al formato requerido por los selects
  const vatConditionsOptions = vatConditions.map((condition) => ({
    option: condition.name,
    key: condition.id,
  }));

  const iibbRegistrationsOptions = iibbRegistrations.map((registration) => ({
    option: registration.name,
    key: registration.id,
  }));

  const industriesOptions = industries.map((industry) => ({
    option: industry.name,
    key: industry.id,
  }));

  const handleCreateStore = async (formValues: IStore & IUser & IDocumentUpload) => {
    setIsLoadingCreateStore(true);

    const storeData: IStore = {
      businessNameStore: formValues.businessNameStore,
      tradeNameStore: formValues.tradeNameStore,
      streetStore: formValues.streetStore,
      streetNumberStore: formValues.streetNumberStore,
      floorStore: formValues.floorStore,
      apartmentStore: formValues.apartmentStore,
      zipCodeStore: formValues.zipCodeStore,
      localityStore: formValues.localityStore,
      provinceStore: formValues.provinceStore,
      vatConditionStore: formValues.vatConditionStore,
      cuitStore: removeCuitDashes(formValues.cuitStore),
      iibbRegisteredStore: formValues.iibbRegisteredStore,
      profitsRegisteredStore: formValues.profitsRegisteredStore,
      categoryStore: formValues.categoryStore,
      emailStore: formValues.emailStore,
      enabledStore: formValues.enabledStore,
    };
    presenter.createStore(storeData);
  };

  const handleUploadDocuments = async (formValues: IStore & IUser & IDocumentUpload, storeId: number) => {
    setIsLoadingUploadDocuments(true);
    const documentsData: IDocumentUpload = {
      afipRegistrationDocument: formValues.afipRegistrationDocument,
      iibbRegistrationDocument: formValues.iibbRegistrationDocument,
      storeRegistrationFormDocument: formValues.storeRegistrationFormDocument,
      powerOfAttorneyDocument: formValues.powerOfAttorneyDocument,
      dniFrontDocument: formValues.dniFrontDocument,
      dniBackDocument: formValues.dniBackDocument,
      brandLogoDocument: formValues.brandLogoDocument,
    };
    presenter.uploadDocuments(documentsData, storeId);
  };

  const handleCreateUserAndAssignToStore = async (storeId: number, formValues: IStore & IUser & IDocumentUpload) => {
    setIsLoadingCreateUserAndAssignToStore(true);

    const userData: IUser = {
      lastNameUser: formValues.lastNameUser,
      firstNameUser: formValues.firstNameUser,
      dniUser: extractDniFromCuit(formValues.cuilUser),
      cuilUser: removeCuitDashes(formValues.cuilUser),
      birthDateUser: formValues.birthDateUser,
      genderUser: formValues.genderUser,
      phoneNumberUser: removePhoneCharacters(formValues.phoneNumberUser),
      emailUser: formValues.emailUser,
      addressUser: formValues.addressUser,
      addressNumberUser: formValues.addressNumberUser,
      localityUser: formValues.localityUser,
      provinceUser: formValues.provinceUser,
      zipCodeUser: formValues.zipCodeUser,
    };
    presenter.createUserAndAssignToStore(storeId, userData);
  };

  const hasDocuments = () => {
    return (
      form.values.afipRegistrationDocument ||
      form.values.iibbRegistrationDocument ||
      form.values.storeRegistrationFormDocument ||
      form.values.powerOfAttorneyDocument ||
      form.values.dniFrontDocument ||
      form.values.dniBackDocument ||
      form.values.brandLogoDocument
    );
  };

  const handleCancel = () => {
    setShowCloseModal(true);
  };

  const handleCloseModalConfirm = () => {
    setShowCloseModal(false);
    navigate(STORES);
  };

  const handleCloseModalCancel = () => {
    setShowCloseModal(false);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    scrollElementToTop();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepSubmit = () => {
    scrollElementToTop();
    if (currentStep === 3) {
      form.onSubmit(handleCreateStore)();
    } else {
      // Validar los campos del paso actual antes de avanzar
      const fieldsToValidate = currentStepFields[currentStep as keyof typeof currentStepFields] || [];
      let hasErrors = false;

      // Validar cada campo del paso actual
      for (const field of fieldsToValidate) {
        const fieldError = form.validateField(field).error;
        if (fieldError) {
          hasErrors = true;
          break;
        }
      }

      // Solo avanzar si no hay errores
      if (!hasErrors) {
        handleNextStep();
      }
    }
  };

  const steps = [
    { step: 1, label: "store.register.stepper.step1" },
    { step: 2, label: "store.register.stepper.step2" },
    { step: 3, label: "store.register.stepper.step3" },
  ];

  const onStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            form={form as unknown as UseFormReturnType<IUser>}
            genderOptions={genderOptions}
            provinces={provinces}
            localities={localities}
            onProvinceChange={(provinceName: string) => presenter?.getLocalities(provinceName)}
            handleCancel={handleCancel}
          />
        );
      case 2:
        return (
          <FormStep2
            form={form as unknown as UseFormReturnType<IStore>}
            provinces={provinces}
            localities={localities}
            onProvinceChange={(provinceName: string) => presenter?.getLocalities(provinceName)}
            vatConditions={vatConditionsOptions}
            yesNoOptions={yesNoOptions}
            iibbRegistereds={iibbRegistrationsOptions}
            categories={industriesOptions}
            handleCancel={handleCancel}
          />
        );
      case 3:
        return <FormStep3 form={form as unknown as UseFormReturnType<IDocumentUpload>} handleCancel={handleCancel} />;
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1:
      case 2:
        return t("common.next");
      case 3:
        return t("store.register.buttons.save");
      default:
        return t("common.next");
    }
  };

  // Definición centralizada de campos por paso
  const currentStepFields = {
    1: [
      "lastNameUser",
      "firstNameUser",
      "cuilUser",
      "birthDateUser",
      "genderUser",
      "phoneNumberUser",
      "emailUser",
      "addressUser",
      "addressNumberUser",
      "localityUser",
      "provinceUser",
      "zipCodeUser",
    ],
    2: [
      "businessNameStore",
      "tradeNameStore",
      "streetStore",
      "streetNumberStore",
      "zipCodeStore",
      "localityStore",
      "provinceStore",
      "vatConditionStore",
      "cuitStore",
      "iibbRegisteredStore",
      "profitsRegisteredStore",
      "categoryStore",
      "emailStore",
    ],
    3: [],
  };

  const isCurrentStepValid = () => {
    const fieldsToValidate = currentStepFields[currentStep as keyof typeof currentStepFields] || [];

    for (const field of fieldsToValidate) {
      const fieldValue = form.values[field as keyof typeof form.values];
      if (!fieldValue || (typeof fieldValue === "string" && fieldValue.trim() === "")) {
        return false;
      }
    }

    return true;
  };

  const renderButtons = () => {
    return (
      <Group justify="flex-end">
        <Group>
          {currentStep > 1 && (
            <CustomButtonWithIcon
              title={t("common.previous")}
              onClick={handlePreviousStep}
              variant="light"
              disabled={isLoadingCreateStore || isLoadingUploadDocuments || isLoadingCreateUserAndAssignToStore}
              icon={() => <IconArrowLeft />}
              leftIcon={true}
            />
          )}

          <CustomButtonWithIcon
            icon={() => <IconArrowRight />}
            rightIcon={currentStep === 3 ? false : true}
            title={getButtonText()}
            onClick={handleStepSubmit}
            variant="primary"
            loading={isLoadingCreateStore || isLoadingUploadDocuments || isLoadingCreateUserAndAssignToStore}
            disabled={isLoadingCreateStore || !isCurrentStepValid()}
            pr={50}
            pl={50}
          />
        </Group>
      </Group>
    );
  };

  return (
    <Box>
      <Wizard steps={steps} currentStep={currentStep} onStepChange={onStepChange} renderButtons={renderButtons}>
        {renderCurrentStep()}
        <Box mt={20}></Box>
      </Wizard>

      <CloseModal isVisible={showCloseModal} onClose={handleCloseModalCancel} onConfirm={handleCloseModalConfirm} />
    </Box>
  );
};

export default StoreRegisterScreen;
