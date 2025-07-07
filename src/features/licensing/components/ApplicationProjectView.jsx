import React, { useState } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 0.5rem;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  color: #fff;
  background-color: ${(props) => props.color};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
`;

// Dummy Data
const initialProjects = [
  {
    id: 1,
    projectName: "US Crypto Exchange License",
    licenseType: "VASP",
    jurisdiction: "USA",
    status: "In Progress",
  },
  {
    id: 2,
    projectName: "European Payments License",
    licenseType: "Payments",
    jurisdiction: "Europe",
    status: "Submitted",
  },
  {
    id: 3,
    projectName: "Nigerian Lending License",
    licenseType: "Lending",
    jurisdiction: "Nigeria",
    status: "Approved",
  },
  {
    id: 4,
    projectName: "Kenyan Remittance License",
    licenseType: "Remittance",
    jurisdiction: "Kenya",
    status: "Renewal Due",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#faad14";
    case "Submitted":
      return "#1890ff";
    case "Approved":
      return "#52c41a";
    case "Renewal Due":
      return "#f5222d";
    default:
      return "#d9d9d9";
  }
};

const ViewProject = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("All");

  const filteredProjects = projects
    .filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (project) => statusFilter === "All" || project.status === statusFilter
    )
    .filter(
      (project) =>
        jurisdictionFilter === "All" ||
        project.jurisdiction === jurisdictionFilter
    );

  return (
    <Container>
      <Header>
        <Title>Licensing Projects</Title>
        <SearchContainer>
          <SearchOutlined />
          <SearchInput
            placeholder="Search projects..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Header>
      <FilterContainer>
        <Select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="In Progress">In Progress</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Renewal Due">Renewal Due</option>
        </Select>
        <Select onChange={(e) => setJurisdictionFilter(e.target.value)}>
          <option value="All">All Jurisdictions</option>
          <option value="USA">USA</option>
          <option value="Europe">Europe</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Kenya">Kenya</option>
        </Select>
      </FilterContainer>
      <Table>
        <thead>
          <tr>
            <Th>Project Name</Th>
            <Th>License Type</Th>
            <Th>Jurisdiction</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <Td>{project.projectName}</Td>
              <Td>{project.licenseType}</Td>
              <Td>{project.jurisdiction}</Td>
              <Td>
                <StatusBadge color={getStatusColor(project.status)}>
                  {project.status}
                </StatusBadge>
              </Td>
              <Td>
                <ActionButton>View Details</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewProject;