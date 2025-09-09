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
- [x] **1. Document Structure Decision** - Decided to keep specs/ 3-file organization for better maintainability
- [x] **2. Content Consolidation** - Merged cleaner content from goals.md into specs/03-design.md
- [x] **3. Metadata Cleanup** - Removed persona/phase references from specs/03-design.md 
- [x] **4. Content Focus** - Kept specs/ comprehensive approach with foundational context
- [x] **5. Title Consistency** - Standardized all titles using em dash (—) format

## Progress Summary
- **✅ Completed**: 6/6 tasks (All design reconciliation tasks complete!)
- **🔄 In Progress**: 0 tasks 
- **⏳ Pending**: 0 tasks

## Final Status
All design reconciliation tasks have been completed successfully:

1. **Document Structure**: ✅ Kept specs/ 3-file structure
2. **Content Consolidation**: ✅ Merged cleaner goals.md content into specs/03-design.md
3. **Metadata Cleanup**: ✅ Removed persona/phase references 
4. **Content Focus**: ✅ Preserved comprehensive specs/ approach
5. **Title Consistency**: ✅ Standardized all titles with em dash format

## Next Steps
- Remove goals.md file (no longer needed)
- Commit all changes
- Design documentation is now reconciled and ready for implementation
