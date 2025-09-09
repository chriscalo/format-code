# Design Reconciliation Tasks

## Task Overview

**Objective**: Reconcile the design documentation between `docs/goals.md` and `specs/` directory, keeping the specs structure while incorporating better design elements from `goals.md`.

**Process**:
1. Analyze all files and identify key differences
2. Present each difference individually for resolution with:
   - Code/content comparisons  
   - Considerations and trade-offs
   - Recommendations
3. Implement approved changes and commit each resolution
4. Mark off completed items and proceed to next difference

## File Locations
- **docs/goals.md**: Single comprehensive design document focused on rehype/remark implementation
- **specs/01-overview.md**: High-level overview, principles, scope, success criteria  
- **specs/02-requirements.md**: Detailed functional/non-functional requirements, selection criteria
- **specs/03-design.md**: Technical architecture, implementation details, code examples

## Analysis Summary

### Document Structure

#### specs/ Directory (3 files)
- **01-overview.md**: High-level overview, principles, scope, success criteria
- **02-requirements.md**: Detailed functional/non-functional requirements, selection criteria  
- **03-design.md**: Technical architecture, implementation details, code examples

#### goals.md (1 file)
- **goals.md**: Single comprehensive design document focused on rehype/remark implementation

### Key Differences

#### 1. **Organization & Structure**
- **specs/**: Well-organized 3-document structure (overview → requirements → design)
- **goals.md**: Single large document mixing overview, requirements, and design

#### 2. **Content Scope**

**Missing from goals.md:**
- Project rationale and "why it matters" section
- Success outcomes and risk mitigation strategies  
- Detailed functional requirements breakdown
- Selection criteria for language tools
- Compatibility requirements (macOS focus)
- Non-functional requirements (determinism, extensibility)

**Missing from specs/:**
- Nothing significant - specs/ appears to be more comprehensive

#### 3. **Technical Content Overlap**
- **Decision Summary**: ~95% identical between specs/03-design.md and goals.md
- **Project Structure**: Identical file/folder layout
- **Data Flow**: Nearly identical implementation approach
- **Configuration**: Same orchestrator.config.js structure
- **CLI & NPM Scripts**: Identical command structure

#### 4. **Presentation Style**
- **specs/03-design.md**: Positioned as "integrating better ideas from provided draft"
- **goals.md**: Presented as primary design document "focused on rehype"

#### 5. **Document Metadata**
- **specs/03-design.md**: Has persona/goal header referencing phases and alignment
- **goals.md**: Clean design document without metadata

### Content Quality Assessment

#### Better in specs/:
- More comprehensive foundational context
- Better requirements documentation
- Clearer separation of concerns
- Professional document structure
- Risk analysis and mitigation strategies

#### Better in goals.md:
- Cleaner presentation without metadata
- More focused on technical implementation
- Single unified reference document

## Resolution Tasks Checklist

### ✅ Completed Tasks
- [x] **Analysis and Documentation** - Analyzed all files and identified key differences

### 🔄 Current Task  
- [ ] **1. Document Structure Decision** - Keep specs/ 3-file organization vs single goals.md approach?
  - **specs/**: Better for navigation, different audiences (PMs vs developers), more maintainable
  - **goals.md**: Better for developers who want everything in one place, less fragmentation
  - **Recommendation**: Keep specs/ 3-file structure for better organization
  - **Status**: Awaiting user decision

### ⏳ Pending Tasks
- [ ] **2. Content Consolidation** - How to merge the ~95% identical technical content between specs/03-design.md and goals.md?
  - Both have nearly identical technical implementation details
  - goals.md has cleaner presentation without metadata
  - specs/03-design.md has persona/goal headers that add clutter

- [ ] **3. Metadata Cleanup** - Remove persona/phase references from specs/03-design.md?
  - specs/03-design.md has: "Persona: Software Architect (Phase 3)" header
  - goals.md has clean design without metadata
  - Metadata appears to reference some external process phases

- [ ] **4. Content Focus** - Use specs/ comprehensive approach vs goals.md focused approach?
  - specs/ is more comprehensive with foundational context
  - goals.md is more focused on technical implementation
  - Need to decide level of detail for target audience

- [ ] **5. Title Consistency** - Standardize on "Code Formatting Orchestrator" vs variations?
  - Different documents use slightly different titles/headings
  - Need consistent branding across all documents

## Progress Summary
- **✅ Completed**: 1 task (Analysis and documentation of differences)
- **🔄 In Progress**: 1 task (Document Structure Decision - awaiting user input)
- **⏳ Pending**: 4 tasks (Content Consolidation, Metadata Cleanup, Content Focus, Title Consistency)

## Next Steps
1. User decides on document structure approach
2. Present remaining issues one by one based on user's structure decision
3. Implement approved changes
4. Commit each resolved aspect
5. Repeat until all aspects are resolved
