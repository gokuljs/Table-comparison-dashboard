import { Grid, TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { TableElementText, Text } from "../styles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { CriteriaType } from "../../../../Pages/Dashboard/types";
import { useForm } from "react-hook-form";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { TableRoW } from "./styles";
import { DummyDataDeleteProps } from "../types";
import { InputFieldTableProps } from "./types";

function InputFieldTableCell({
  id,
  value,
  dummyDataSet,
  setDummyDataSet,
  chooseCriteria,
  setChooseCriteria,
  data,
  deleteAttribute,
}: InputFieldTableProps) {
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const tempArray = [...dummyDataSet];
    switch (true) {
      case chooseCriteria === CriteriaType.COMPANY_INFO:
        tempArray[0] = { ...tempArray[0], [chooseCriteria]: "Company Info" };
        setDummyDataSet([...tempArray]);
        break;
      case chooseCriteria === CriteriaType.FEATURES:
        tempArray[0] = { ...tempArray[0], [chooseCriteria]: "Features" };
        setDummyDataSet([...tempArray]);
        break;
      case chooseCriteria === CriteriaType.CUSTOMER_CASE_STUDIES:
        tempArray[0] = {
          ...tempArray[0],
          [chooseCriteria]: "Customer Case Studies",
        };
        setDummyDataSet([...tempArray]);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseCriteria]);

  useEffect(() => {
    const tempArray = [...dummyDataSet];
    switch (true) {
      case dummyDataSet[0].companyInfo &&
        !dummyDataSet.every((value) => value?.companyInfo) &&
        chooseCriteria !== CriteriaType.COMPANY_INFO:
        tempArray.forEach((value, index) => {
          if (value?.id !== "0" && !value?.companyInfo) {
            tempArray[index] = { ...value, companyInfo: " " };
          }
        });
        setDummyDataSet([...tempArray]);
        break;
      case dummyDataSet[0].features &&
        !dummyDataSet.every((value) => value?.features) &&
        chooseCriteria !== CriteriaType.FEATURES:
        tempArray.forEach((value, index) => {
          if (value?.id !== "0" && !value?.features) {
            tempArray[index] = { ...value, features: " " };
          }
        });
        setDummyDataSet([...tempArray]);
        break;
      case dummyDataSet[0].customerCaseStudies &&
        !dummyDataSet.every((value) => value?.customerCaseStudies) &&
        chooseCriteria !== CriteriaType.CUSTOMER_CASE_STUDIES:
        tempArray.forEach((value, index) => {
          if (value?.id !== "0" && !value?.customerCaseStudies) {
            tempArray[index] = { ...value, customerCaseStudies: " " };
          }
        });
        setDummyDataSet([...tempArray]);
        break;
      case !dummyDataSet[0]?.productDescription &&
        dummyDataSet.some((value) => value?.productDescription):
        tempArray.forEach((value) => {
          delete value?.productDescription;
        });
        setDummyDataSet([...tempArray]);
        break;
      case !dummyDataSet[0]?.features &&
        dummyDataSet.some((value) => value?.features):
        tempArray.forEach((value) => {
          delete value?.features;
        });
        setDummyDataSet([...tempArray]);
        break;
      default:
        break;
    }
    console.log({ dummyDataSet }, "ssss");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseCriteria, dummyDataSet]);

  const validatingInputFieldExistOrNot = () => {
    switch (true) {
      case chooseCriteria === CriteriaType.COMPANY_INFO && !value:
        return true;
      case chooseCriteria === CriteriaType.FEATURES && !value:
        return true;
      case chooseCriteria === CriteriaType.CUSTOMER_CASE_STUDIES && !value:
        return true;
      default:
        return false;
    }
  };
  const deleteData = (deleteAttribute: DummyDataDeleteProps) => {
    const tempArray = [...dummyDataSet];
    tempArray.forEach((value) => {
      if (
        deleteAttribute === DummyDataDeleteProps?.COMPANY_INFO &&
        value?.companyInfo
      ) {
        delete value?.companyInfo;
        setChooseCriteria(CriteriaType.DEFAULT);
      } else if (
        deleteAttribute === DummyDataDeleteProps?.FEATURES &&
        value?.features
      ) {
        delete value?.features;
        setChooseCriteria(CriteriaType.DEFAULT);
      } else if (
        deleteAttribute === DummyDataDeleteProps?.CUSTOMER_CASE_STUDIES &&
        value?.customerCaseStudies
      ) {
        delete value?.customerCaseStudies;
        setChooseCriteria(CriteriaType.DEFAULT);
      }
    });

    // setAddingDummyData({ ...addingDummyData });
    setDummyDataSet([...tempArray]);
  };
  const onSubmit = (value: any, selectedData: any) => {
    const index = dummyDataSet.findIndex((val) => val.id === id);
    if (index !== -1 && chooseCriteria) {
      const tempArray = [...dummyDataSet];
      tempArray[index] = {
        ...selectedData,
        [chooseCriteria]: value[chooseCriteria],
      };
      setDummyDataSet([...tempArray]);
    }
    reset();
  };

  const placeHolderText = () => {
    switch (true) {
      case chooseCriteria === CriteriaType.COMPANY_INFO && !data?.companyInfo:
        return "Company Info";
      case chooseCriteria === CriteriaType.FEATURES && !data?.features:
        return "Features";
      case chooseCriteria === CriteriaType.CUSTOMER_CASE_STUDIES &&
        !data?.customerCaseStudies:
        return "Customer Case Studies";
      default:
        return "";
    }
  };

  return (
    <TableRoW>
      {!validatingInputFieldExistOrNot() ? (
        <TableCell className="table-cell" align="left">
          <Text>
            <Grid>
              <TableElementText>{value}</TableElementText>
            </Grid>
            <Grid>
              {" "}
              {id === "0" && (
                <CancelRoundedIcon
                  onClick={() => deleteData(deleteAttribute)}
                  className="circled-cancel-icon"
                />
              )}
            </Grid>
          </Text>
        </TableCell>
      ) : (
        <TableCell className="table-cell" align="left">
          <form
            className="table-cell-input"
            onSubmit={handleSubmit((value) => onSubmit(value, data))}
          >
            <input
              type="text"
              placeholder={`Please enter ${placeHolderText()}`}
              {...register(chooseCriteria, { required: true })}
              className="inputTextField"
            />
            <button type="submit" className="submit-button">
              <CheckCircleRoundedIcon
                type="submit"
                className="circle-tick-icon"
              />
            </button>
          </form>
        </TableCell>
      )}
    </TableRoW>
  );
}

export default InputFieldTableCell;
