import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Dialog, // 추가: Dialog 및 관련 컴포넌트 import
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { defaultInstance } from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";
import StorageIcon from "@mui/icons-material/Storage";
import { useModal } from "../../context/ModalContext";
import Modal from "../common/Modal";

const AddMemberForm = ({ onSubmit, kakaoEmail }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [isSmsVerified, setIsSmsVerified] = useState(false); // 테스트로 잠시 true 놓음
  const [isAgreed, setIsAgreed] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [isUseChecked, setIsUseChecked] = useState(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [authNumError, setAuthNumError] = useState(false);
  const { openModal } = useModal();

  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    const inputValue = e.target.value;
    setNickname(inputValue);
    if (inputValue.length < 2) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    if (inputValue.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    if (inputValue.length < 8) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handlePhoneChange = (e) => {
    // Allow only numbers and limit input to 11 characters
    const inputValue = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(inputValue);
    if (inputValue.length === 11) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleAuthNumChange = (e) => {
    // Allow only numbers and limit input to 6 characters
    const inputValue = e.target.value;
    setAuthNum(inputValue);
    if (inputValue.length === 6) {
      setAuthNumError(false);
    } else {
      setAuthNumError(true);
    }
  };

  const handleGetAuthNum = async () => {
    try {
      const response = await defaultInstance.post("/auth/sendSms", {
        to: phone,
      });
      console.log(response);

      // 인증번호가 성공적으로 전송되었다면 화면 전환을 막음
      if (response.status === 200) {
        handleOpenDialog13("인증번호가 발송되었습니다.");
        // 추가로 필요한 작업 수행...
      }
    } catch (error) {
      window.alert("SMS 인증 번호 전송 중 오류 발생:", error);
    }
  };

  const handleVerifyAuthNum = async () => {
    try {
      const response = await defaultInstance.post("/auth/verifySms", {
        to: phone,
        authNumber: authNum,
      });
      console.log(response);
      if (response.status === 200) {
        setIsSmsVerified(true);
        handleOpenDialog14("휴대폰 인증 성공!");
      }
    } catch (error) {}
  };

  const handleCheckAll = () => {
    setIsAgeChecked(true);
    setIsUseChecked(true);
    setIsMarketingChecked(true);
    setIsAgreed(true);
  };

  const handleUncheckAll = () => {
    setIsAgeChecked(false);
    setIsUseChecked(false);
    setIsMarketingChecked(false);
    setIsAgreed(false);
  };

  const handleSubmit = async () => {
    try {
      // Your existing code for submitting the form
      if (nickname.length < 2) {
        handleOpenDialog4("닉네임은 2자 이상이어야 합니다.");
        return;
      }
      if (password.length < 8) {
        handleOpenDialog5("비밀번호는 8자 이상이어야 합니다.");
        return;
      }
      if (confirmPassword.length < 8) {
        handleOpenDialog6("비밀번호 확인은 8자 이상이어야 합니다.");
        return;
      }
      if (phone.length !== 11) {
        handleOpenDialog7("휴대폰 번호는 11자여야 합니다.");
        return;
      }
      if (authNum.length !== 6) {
        handleOpenDialog8("인증 번호는 6자여야 합니다.");
        return;
      }

      if (password !== confirmPassword) {
        handleOpenDialog9("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (!isSmsVerified) {
        handleOpenDialog10("휴대폰 인증이 필요합니다.");
        return;
      }

      if (!isAgeChecked) {
        handleOpenDialog11("개인정보 수집 및 이용 동의에 동의해 주세요.");
        return;
      }
      if (!isUseChecked) {
        handleOpenDialog12("이용 약관에 동의해 주세요.");
        return;
      }
      await handleVerifyAuthNum();

      const response = await defaultInstance.post("/auth/member/add", {
        nickname,
        pw: password,
        phone,
        email: kakaoEmail ? kakaoEmail : null,
        imageId: null,
        score: 36.5,
        roleFlag: false,
        socialFlag: false,
        paymentAccount: null,
        paymentBank: null,
        paymentBalance: null,
        paymentPw: null,
        memberRoleType: "MEMBER",
        image_URL: null,
        profile_URL: "https://koguma.kr.object.ncloudstorage.com/image.webp",
      });

      if (response.status === 200) {
        // 성공
        onSubmit();
        openModal("회원가입이 완료되었습니다!", true, () => {
          navigate("/member/add/complete");
        });
      } else {
        // 에러 처리
        const data = await response.json();
        window.alert(`회원 가입 실패: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 다이얼로그 관련 상태 및 핸들러
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [openDialog5, setOpenDialog5] = useState(false);
  const [openDialog6, setOpenDialog6] = useState(false);
  const [openDialog7, setOpenDialog7] = useState(false);
  const [openDialog8, setOpenDialog8] = useState(false);
  const [openDialog9, setOpenDialog9] = useState(false);
  const [openDialog10, setOpenDialog10] = useState(false);
  const [openDialog11, setOpenDialog11] = useState(false);
  const [openDialog12, setOpenDialog12] = useState(false);
  const [openDialog13, setOpenDialog13] = useState(false);
  const [openDialog14, setOpenDialog14] = useState(false);

  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };
  const handleOpenDialog2 = () => {
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
  };
  const handleOpenDialog3 = () => {
    setOpenDialog3(true);
  };

  const handleCloseDialog3 = () => {
    setOpenDialog3(false);
  };
  const handleOpenDialog4 = () => {
    setOpenDialog4(true);
  };

  const handleCloseDialog4 = () => {
    setOpenDialog4(false);
  };
  const handleOpenDialog5 = () => {
    setOpenDialog5(true);
  };

  const handleCloseDialog5 = () => {
    setOpenDialog5(false);
  };
  const handleOpenDialog6 = () => {
    setOpenDialog6(true);
  };

  const handleCloseDialog6 = () => {
    setOpenDialog6(false);
  };
  const handleOpenDialog7 = () => {
    setOpenDialog7(true);
  };

  const handleCloseDialog7 = () => {
    setOpenDialog7(false);
  };
  const handleOpenDialog8 = () => {
    setOpenDialog8(true);
  };

  const handleCloseDialog8 = () => {
    setOpenDialog8(false);
  };
  const handleOpenDialog9 = () => {
    setOpenDialog9(true);
  };

  const handleCloseDialog9 = () => {
    setOpenDialog9(false);
  };
  const handleOpenDialog10 = () => {
    setOpenDialog10(true);
  };

  const handleCloseDialog10 = () => {
    setOpenDialog10(false);
  };
  const handleOpenDialog11 = () => {
    setOpenDialog11(true);
  };

  const handleCloseDialog11 = () => {
    setOpenDialog11(false);
  };
  const handleOpenDialog12 = () => {
    setOpenDialog12(true);
  };

  const handleCloseDialog12 = () => {
    setOpenDialog12(false);
  };
  const handleOpenDialog13 = () => {
    setOpenDialog13(true);
  };

  const handleCloseDialog13 = () => {
    setOpenDialog13(false);
  };
  const handleOpenDialog14 = () => {
    setOpenDialog14(true);
  };

  const handleCloseDialog14 = () => {
    setOpenDialog14(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: "large", marginBottom: 2 }} />
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            가입하기
          </Typography>
          <Modal />
          <TextField
            label="닉네임"
            fullWidth
            value={nickname}
            onChange={handleNicknameChange}
            margin="normal"
            error={nicknameError} // Set error state
            helperText={
              nicknameError ? "닉네임은 2자 이상 입력해야 합니다." : ""
            }
          />
          <TextField
            label="비밀번호"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            error={passwordError} // Set error state
            helperText={
              passwordError ? "비밀번호는 8자 이상 입력해야 합니다." : ""
            }
          />
          <TextField
            label="비밀번호 확인"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            error={confirmPasswordError} // Set error state
            helperText={
              confirmPasswordError
                ? "비밀번호 확인은 8자 이상 입력해야 합니다."
                : ""
            }
          />
          <TextField
            label="휴대폰 번호"
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
            margin="normal"
            error={phoneError} // Set error state
            helperText={
              phoneError ? "휴대폰 번호는 11자리의 숫자만 입력해야 합니다." : ""
            }
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetAuthNum}
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            인증번호 받기
          </Button>
          <TextField
            label="인증번호"
            fullWidth
            value={authNum}
            onChange={handleAuthNumChange}
            margin="normal"
            error={authNumError} // Set error state
            helperText={
              authNumError ? "인증번호는 6자리의 숫자만 입력해야 합니다." : ""
            }
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleVerifyAuthNum}
            sx={{ marginTop: 1, marginBottom: 2, width: "35.5%" }}
          >
            인증 확인
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={isAgeChecked}
                onChange={() => setIsAgeChecked(!isAgeChecked)}
                sx={{ color: "secondary.main" }}
              />
            }
            label={
              <div>
                정보 수집 및 이용 동의
                <Typography
                  variant="caption"
                  sx={{ color: "primary.main", marginLeft: 1 }}
                >
                  [필수]
                </Typography>
                <IconButton
                  color="secondary"
                  onClick={handleOpenDialog1}
                  sx={{ width: "auto", marginRight: "auto" }}
                >
                  <StorageIcon />
                </IconButton>
              </div>
            }
            sx={{ marginTop: 1, marginBottom: 1, width: "100%" }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isUseChecked}
                onChange={() => setIsUseChecked(!isUseChecked)}
                sx={{ color: "secondary.main" }}
              />
            }
            label={
              <div>
                이용 약관 동의
                <Typography
                  variant="caption"
                  sx={{ color: "primary.main", marginLeft: 1 }}
                >
                  [필수]
                </Typography>
                <IconButton
                  color="secondary"
                  onClick={handleOpenDialog2}
                  sx={{
                    width: "auto",
                    marginRight: "auto",
                    marginLeft: "49px",
                  }}
                >
                  <StorageIcon />
                </IconButton>
              </div>
            }
            sx={{ marginTop: 1, marginBottom: 1, width: "100%" }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isMarketingChecked}
                onChange={() => setIsMarketingChecked(!isMarketingChecked)}
                sx={{ color: "secondary.main" }}
              />
            }
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  광고성 정보 수신 동의
                  <Typography
                    variant="caption"
                    sx={{ color: "primary.main", marginLeft: 1 }}
                  >
                    [선택]
                  </Typography>
                </div>
                <IconButton
                  color="secondary"
                  onClick={handleOpenDialog3}
                  sx={{ width: "auto", marginRight: "auto", marginLeft: "4px" }}
                >
                  <StorageIcon />
                </IconButton>
              </div>
            }
            sx={{ marginTop: 1, marginBottom: 1, width: "100%" }}
          />

          {/* 전체 동의/해제 버튼 */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => (isAgreed ? handleUncheckAll() : handleCheckAll())}
            sx={{ marginTop: 1, marginBottom: 1, width: "35.5%" }}
          >
            {isAgreed ? "전체 해제" : "전체 동의"}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ marginTop: 2, width: "100%" }}
          >
            가입하기
          </Button>

          {/* 다이얼로그 추가 */}
          <Dialog
            onClose={handleCloseDialog1}
            open={openDialog1}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              개인정보 수집 및 이용 동의
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                안녕하세요,
                <br />
                저희는 귀하의 개인정보를 안전하게 관리하고 이용하기 위해 아래와
                같은 내용으로 개인정보 수집 및 이용 동의를 받고자 합니다.
              </Typography>
              <Typography gutterBottom>
                <br />
                수집 및 이용 목적:
                <br />
                귀하의 개인정보를 수집하는 목적은 서비스 제공입니다. 이 정보는
                다양한 서비스 제공을 위해 활용될 수 있습니다.
                <br />
                <br />
                수집 대상 개인정보 항목은 다음과 같습니다: 전화번호, 이메일
                <br />
                개인정보의 수집 및 이용은 최소한의 범위 내에서 이루어집니다.
                <br />
                <br />
                개인정보 보유 및 이용 기간: 1년
                <br />
                귀하의 개인정보는 수집 목적이 달성된 후에는 1년 동안 안전하게
                보관되며, 해당 기간 이후에는 즉시 파기됩니다.
                <br />
                <br />
                동의 거부권 및 미동의 시의 영향: 서비스 이용 불가
                <br />
                개인정보 수집 및 이용에 대한 동의는 거부할 권리가 있습니다.
                <br /> 그러나 동의를 거부할 경우 저희 서비스를 이용하실 수
                없습니다.
                <br />
                <br />
              </Typography>
              <Typography gutterBottom>
                동의하실 경우, 체크박스를 체크 표시로 변경해주시기 바랍니다.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog1}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog2}
            open={openDialog2}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              이용 약관 동의
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                안녕하세요,
                <br />
                저희의 서비스를 이용해 주셔서 감사합니다. 본 약관은 귀하와 저희
                사이의 서비스 이용에 관한 규정을 담고 있습니다. 아래 내용을 주의
                깊게 읽어주시기 바랍니다.
              </Typography>
              <Typography gutterBottom>
                <br />
                약관의 목적:
                <br />
                본 약관의 목적은 저희 서비스를 이용함에 있어 발생할 수 있는
                권리와 의무, 책임 등에 관한 사항을 규정함에 있습니다.
                <br />
                <br />
                서비스 이용:
                <br />
                귀하는 서비스를 이용함에 있어 모든 관련 법령 및 본 약관에 따라
                동의하고 이를 준수해야 합니다.
                <br />
                서비스 이용 중 발생하는 모든 활동에 대한 책임은 귀하에게
                있습니다.
                <br />
                <br />
                계정 및 개인정보:
                <br />
                서비스 이용을 위해 개인정보를 제공하셔야 합니다.
                <br />
                귀하는 제공한 정보가 정확하고 최신인지를 유지해야 합니다.
                <br />
                <br />
                금지 행위:
                <br />
                서비스 이용 시 아래의 행위는 금지됩니다.
                <br />
                불법적인 행위, 타인의 권리 침해, 악의적인 행동 등을 포함한
                위법한 활동.
                <br />
                서비스 시스템의 원활한 운영을 방해하는 행위.
                <br />
                <br />
                서비스 변경 및 중단:
                <br />
                저희는 사전 공지 없이 서비스 내용을 변경하거나 중단할 권리를
                갖습니다.
                <br />
                <br />
                면책 조항:
                <br />
                서비스 이용으로 인해 발생하는 문제 또는 손실에 대해 저희는
                일체의 책임을 지지 않습니다.
                <br />
                <br />
                이용 약관의 변경:
                <br />
                본 약관은 상황에 따라 변경될 수 있으며, 변경 시에는 서비스 내
                공지사항을 통해 고지합니다.
                <br />
                <br />
              </Typography>
              <Typography gutterBottom>
                동의하실 경우, 체크박스를 체크 표시로 변경해주시기 바랍니다.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog2}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog3}
            open={openDialog3}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              광고성 정보 수신 동의
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                안녕하세요,
                <br />
                저희는 귀하에게 최신 소식, 특별 혜택, 이벤트 정보 등 다양한
                광고성 정보를 제공하려 합니다. 아래 내용을 주의 깊게 읽어주시기
                바랍니다.
                <br />
                <br />
              </Typography>
              <Typography gutterBottom>
                수집 및 이용 목적:
                <br />
                귀하에게 광고성 정보를 제공하기 위해 귀하의 정보를 수집하고
                활용합니다.
                <br />
                제공되는 정보는 주로 새로운 제품, 서비스, 이벤트, 프로모션 등과
                관련된 내용을 포함할 수 있습니다.
                <br />
                <br />
                수집하는 개인정보 항목:
                <br />
                성명, 전화번호, 이메일 주소 등 광고성 정보 제공에 필요한
                최소한의 개인정보를 수집할 수 있습니다.
                <br />
                <br />
                개인정보 보유 및 이용 기간:
                <br />
                귀하의 동의를 받은 기간 동안 개인정보를 보유하며, 동의 철회
                시에는 지체 없이 파기합니다.
                <br />
                <br />
                동의 거부권 및 미동의 시의 영향:
                <br />
                개인정보 수집 및 광고성 정보 제공에 동의하지 않아도 서비스
                이용에는 영향을 미치지 않습니다.
                <br />
                <br />
              </Typography>
              <Typography gutterBottom>
                동의하실 경우, 체크박스를 체크 표시로 변경해주시기 바랍니다.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog3}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog4}
            open={openDialog4}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                2자 이상의 닉네임을 입력해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog4}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog5}
            open={openDialog5}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                8자 이상의 비밀번호를 입력해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog5}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog6}
            open={openDialog6}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                8자 이상의 비밀번호 확인을 입력해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog6}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog7}
            open={openDialog7}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                11자의 휴대폰 번호를 입력해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog7}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog8}
            open={openDialog8}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                6자의 인증번호를 입력해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog8}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog9}
            open={openDialog9}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                비밀번호가 일치하지 않습니다.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog9}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog10}
            open={openDialog10}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>휴대폰 인증이 필요합니다.</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog10}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog11}
            open={openDialog11}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                개인정보 수집 및 이용 동의에 동의해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog11}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog12}
            open={openDialog12}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>이용 약관에 동의해 주세요.</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog12}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog13}
            open={openDialog13}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                휴대폰 인증 번호가 발송되었습니다!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog13}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleCloseDialog14}
            open={openDialog14}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              안내
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>휴대폰 인증 성공!</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog14}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddMemberForm;
