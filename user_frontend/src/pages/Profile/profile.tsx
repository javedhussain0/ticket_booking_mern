import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled, { css } from "styled-components";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  padding: 40px 20px;
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #222;
  flex: 1;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
`;

const BackButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background-color: #fcc509;
  color: black;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e6b300;
    transform: scale(1.05);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #444;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 14px;
  border: 1px solid ${(props) => (props.hasError ? "#f44336" : "#ddd")};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#f44336" : "#007bff")};
    box-shadow: 0px 0px 6px
      ${(props) => (props.hasError ? "rgba(244, 67, 54, 0.6)" : "rgba(0, 123, 255, 0.4)")};
  }
`;

const ErrorText = styled.span`
  color: #f44336;
  font-size: 13px;
  font-weight: 500;
  margin-top: -12px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  align-self: center;
  cursor: pointer;
  border: 3px solid #f0f0f0;
  transition: all 0.3s;

  &:hover {
    border-color: #007bff;
    transform: scale(1.05);
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 20px;
  background-color: ${({ variant }) =>
    variant === "secondary" ? "#f44336" : "#007bff"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "secondary" ? "#d32f2f" : "#0056b3"};
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useUserStore();
  const [name, setName] = useState<string>(user.name);
  const [profilePic, setProfilePic] = useState<string>(user.profilePic);
  const [errors, setErrors] = useState<{ name?: string; profilePic?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Reset errors when inputs change
    setErrors({});
  }, [name, profilePic]);

  const handleBack = () => {
    navigate("/");
  };

  // Simple validation example
  const validate = () => {
    const newErrors: typeof errors = {};
    if (name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    if (profilePic && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(profilePic))
      newErrors.profilePic = "Enter a valid image URL (jpg, png, gif)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    updateProfile({ name, profilePic });
    alert("Profile updated successfully!");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ProfileContainer>
      <Header>
        <BackButton onClick={handleBack}>⬅ Back</BackButton>
        <Title>Rider Profile</Title>
      </Header>

      <Form onSubmit={handleSubmit} noValidate>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="profile-upload">
          <ProfileImage src={profilePic} alt="Profile" title="Change Profile Picture" />
        </label>

        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hasError={Boolean(errors.name)}
            aria-describedby="name-error"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <ErrorText id="name-error">{errors.name}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="profilePic">Profile Picture URL</Label>
          <Input
            type="url"
            id="profilePic"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Enter image URL"
            hasError={Boolean(errors.profilePic)}
            aria-describedby="url-error"
            aria-invalid={Boolean(errors.profilePic)}
          />
          {errors.profilePic && <ErrorText id="url-error">{errors.profilePic}</ErrorText>}
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" variant="primary">
            💾 Save Changes
          </Button>
          <Button type="button" variant="secondary" onClick={handleLogout}>
            🚪 Logout
          </Button>
        </ButtonGroup>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;
