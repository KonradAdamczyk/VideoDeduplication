import fileCacheInitialState from "./fileCache/initialState";
import fileClusterInitialState from "./fileCluster/initialState";
import fileMatchesInitialState from "./fileMatches/initialState";
import fileListInitialState from "./fileList/initialState";
import tasksInitialState from "./tasks/initialState";
import taskCacheInitialState from "./taskCache/initialState";
import taskLogsInitialState from "./taskLogs/initialState";
import templatesInitialState from "./templates/initialState";
import objectCacheInitialState from "./objectCache/initialState";
import presetInitialState from "./presets/initialState";

/**
 * Initial State for file collection management.
 */
const initialState = {
  /**
   * Files loaded and displayed on the file browser page ('My Collection').
   */
  fileList: fileListInitialState,
  /**
   * Cached individual files with fully-loaded data.
   */
  fileCache: fileCacheInitialState,
  /**
   * Single file neighboring cluster (closely-connected files).
   */
  fileCluster: fileClusterInitialState,
  /**
   * Single-file's immediate matches (used in 'NN Files Matched' and 'Compare'
   * pages).
   */
  fileMatches: fileMatchesInitialState,
  /**
   * Background tasks.
   */
  tasks: tasksInitialState,
  /**
   * Background task cache.
   */
  taskCache: taskCacheInitialState,
  /**
   * Background task logs.
   */
  taskLogs: taskLogsInitialState,
  /**
   * Object templates.
   */
  templates: templatesInitialState,
  /**
   * Cache of recognized objects per file.
   */
  objectCache: objectCacheInitialState,
  /**
   * File filter presets.
   */
  presets: presetInitialState,
};

export default initialState;
