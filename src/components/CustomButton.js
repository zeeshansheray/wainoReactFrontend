import React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { ColorSchemeCode } from "../enums/ColorScheme";

const CustomButtonRoot = styled(Button)((props) => ({
  backgroundColor:
    props.variant === "tertiary"
      ? "transparent"
      : props.variant === "dangerPrimary"
      ? ColorSchemeCode.danger30
      : props.variant === "dangerSecondary"
      ? ColorSchemeCode.white
      : props.variant === "dangerTertiary"
      ? ColorSchemeCode.white
      : props.variant === "tertiary"
      ? ColorSchemeCode.white
      : props.variant === "secondary"
      ? "transparent"
      : props.variant === "primary"
      ? ColorSchemeCode.primary50
      : props.variant === "warning"
      ? ColorSchemeCode.danger30
      : props.variant === "warningSecondary"
      ? ColorSchemeCode.white
      : ColorSchemeCode.primary50,
  borderRadius: "3px",
  boxShadow:
    props.variant === "primary"
      ? "0px 1px 2px rgba(15, 15, 15, 0.1), inset 0px 0px 1px rgba(15, 15, 15, 0.1)"
      : "none",
  outline:
    props.variant === "secondary"
      ? `1px solid ${ColorSchemeCode.neutral20}`
      : props.variant === "dangerPrimary"
      ? `1px solid ${ColorSchemeCode.neutral20}`
      : props.variant === "warningSecondary"
      ? `1px solid ${ColorSchemeCode.neutral20}`
      : "1px solid transparent",
  padding:
    props.size === "xl"
      ? "16px 16px"
      : props.size === "l"
      ? "12px 16px"
      : props.size === "s"
      ? "6px 16px"
      : "8px 16px",
  color:
    props.variant === "dangerPrimary"
      ? ColorSchemeCode.primary0
      : props.variant === "dangerSecondary"
      ? ColorSchemeCode.danger30
      : props.variant === "dangerTertiary"
      ? ColorSchemeCode.danger30
      : props.variant === "tertiary"
      ? ColorSchemeCode.primary50
      : props.variant === "secondary"
      ? ColorSchemeCode.primary50
      : props.variant === "primary"
      ? ColorSchemeCode.primary0
      : props.variant === "warning"
      ? ColorSchemeCode.white
      : props.variant === "warningSecondary"
      ? ColorSchemeCode.danger30
      : ColorSchemeCode.primary0,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor:
      props.variant === "dangerPrimary"
        ? ColorSchemeCode.danger40
        : props.variant === "dangerSecondary"
        ? ColorSchemeCode.danger0
        : props.variant === "dangerTertiary"
        ? ColorSchemeCode.danger0
        : props.variant === "tertiary"
        ? ColorSchemeCode.primary0
        : props.variant === "secondary"
        ? ColorSchemeCode.primary0
        : props.variant === "primary"
        ? ColorSchemeCode.primary60
        : props.variant === "warning"
        ? ColorSchemeCode.danger20
        : props.variant === "warningSecondary"
        ? ColorSchemeCode.danger0
        : ColorSchemeCode.primary60,
    color:
      props.variant === "dangerPrimary"
        ? ColorSchemeCode.primary0
        : props.variant === "dangerSecondary"
        ? ColorSchemeCode.danger30
        : props.variant === "dangerTertiary"
        ? ColorSchemeCode.danger30
        : props.variant === "tertiary"
        ? ColorSchemeCode.primary50
        : props.variant === "secondary"
        ? ColorSchemeCode.primary50
        : props.variant === "primary"
        ? ColorSchemeCode.primary0
        : props.variant === "warning"
        ? ColorSchemeCode.white
        : props.variant === "warningSecondary"
        ? ColorSchemeCode.danger40
        : ColorSchemeCode.primary0,
    outline:
      props.variant === "secondary"
        ? `1px solid ${ColorSchemeCode.primary50}`
        : props.variant === "dangerSecondary"
        ? `1px solid ${ColorSchemeCode.danger30}`
        : props.variant === "warningSecondary"
        ? `1px solid ${ColorSchemeCode.danger40}`
        : "1px solid transparent",
    boxShadow: "none",
  },
  "&:focus": {
    backgroundColor:
      props.variant === "dangerPrimary"
        ? ColorSchemeCode.danger50
        : props.variant === "dangerSecondary"
        ? ColorSchemeCode.danger10
        : props.variant === "dangerTertiary"
        ? ColorSchemeCode.danger10
        : props.variant === "tertiary"
        ? ColorSchemeCode.primary10
        : props.variant === "secondary"
        ? ColorSchemeCode.primary10
        : props.variant === "primary"
        ? ColorSchemeCode.primary70
        : props.variant === "warning"
        ? ColorSchemeCode.ButtonWarningPressedText
        : props.variant === "warningSecondary"
        ? ColorSchemeCode.danger10
        : ColorSchemeCode.primary70,
    color:
      props.variant === "dangerPrimary"
        ? ColorSchemeCode.primary0
        : props.variant === "dangerSecondary"
        ? ColorSchemeCode.danger60
        : props.variant === "dangerTertiary"
        ? ColorSchemeCode.danger50
        : props.variant === "tertiary"
        ? ColorSchemeCode.primary70
        : props.variant === "secondary"
        ? ColorSchemeCode.primary70
        : props.variant === "primary"
        ? ColorSchemeCode.primary0
        : props.variant === "warning"
        ? ColorSchemeCode.primary0
        : props.variant === "warningSecondary"
        ? ColorSchemeCode.danger50
        : ColorSchemeCode.white,
    outline:
      props.variant === "secondary"
        ? `2px solid ${ColorSchemeCode.danger50}`
        : props.variant === "dangerSecondary"
        ? ColorSchemeCode.danger50
        : props.variant === "warningSecondary"
        ? `1px solid ${ColorSchemeCode.danger50}`
        : "1px solid transparent",
  },
}));

const CustomButton = ({
  backgroundColor,
  color,
  className,
  onClick,
  disabled,
  btntext,
  icon,
  ...props
}) => {
  return (
    <CustomButtonRoot
      onClick={onClick}
      variant="contained"
      color={color}
      disabled={disabled}
      className={
        "U14M " +
        (props.variant === "secondary"
          ? "secondary " + className
          : props.variant === "primary"
          ? "customButton " + className
          : props.variant === "warning"
          ? "warning " + className
          : props.variant === "warningSecondary"
          ? "warningSecondary " + className
          : "customButton " + className)
      }
    >
      {icon ? (
        <>
          <div className="d-flex">{icon} </div>
          {btntext !== "" && <div className="ml_6">{btntext}</div>}
        </>
      ) : (
        <div> {btntext} </div>
      )}
    </CustomButtonRoot>
  );
};

export default CustomButton;
